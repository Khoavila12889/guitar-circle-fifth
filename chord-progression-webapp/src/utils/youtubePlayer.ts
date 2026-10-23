export interface YouTubePlayer {
  destroy(): void
  setVolume(volume: number): void
}
interface YouTubeAPI {
  Player: new (element: HTMLElement, options: {
    height: string; width: string; videoId: string
    playerVars: { autoplay: number; rel: number }
    events: { onReady: (event: { target: YouTubePlayer }) => void }
  }) => YouTubePlayer
}
declare global {
  interface Window {
    YT?: YouTubeAPI
    onYouTubeIframeAPIReady?: () => void
  }
}

let pending: Promise<YouTubeAPI> | null = null
export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (pending) return pending
  pending = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    const script = document.createElement('script')
    const timeout = window.setTimeout(() => fail(), 15000)
    const fail = () => {
      window.clearTimeout(timeout)
      script.remove()
      pending = null
      reject(new Error('Không tải được YouTube. Thử lại hoặc mở link ở tab mới.'))
    }
    window.onYouTubeIframeAPIReady = () => {
      window.clearTimeout(timeout)
      previous?.()
      if (window.YT?.Player) resolve(window.YT)
      else fail()
    }
    script.src = 'https://www.youtube.com/iframe_api'
    script.onerror = fail
    document.head.appendChild(script)
  })
  return pending
}
