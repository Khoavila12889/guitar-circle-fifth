// Supported providers and behavior recovered from gh-pages commit 0c27318.
export interface PracticeMedia {
  type: 'youtube' | 'soundcloud' | 'external'
  originalUrl: string
  embedUrl?: string
  videoId?: string
  label: string
}

export function parsePracticeMedia(input: string): PracticeMedia | null {
  let url: URL
  try { url = new URL(input.trim()) } catch { return null }
  if (!['https:', 'http:'].includes(url.protocol)) return null
  const host = url.hostname.replace(/^www\./, '')
  const originalUrl = url.href
  if (['youtube.com', 'm.youtube.com', 'youtu.be'].includes(host)) {
    const videoId = host === 'youtu.be' ? url.pathname.slice(1).split('/')[0]
      : url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null
    return { type: 'youtube', videoId, originalUrl, label: 'YouTube', embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` }
  }
  if (host === 'soundcloud.com' || host.endsWith('.soundcloud.com')) {
    return { type: 'soundcloud', originalUrl, label: 'SoundCloud', embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(originalUrl)}&color=%236366f1&auto_play=true&show_artwork=true` }
  }
  const external: Record<string, string> = {
    'zingmp3.vn': 'Zing MP3', 'nhaccuatui.com': 'NhacCuaTui', 'spotify.com': 'Spotify',
    'music.apple.com': 'Nhạc ngoài', 'nhac.vn': 'Nhạc ngoài',
  }
  const provider = Object.keys(external).find(domain => host === domain || host.endsWith(`.${domain}`))
  return provider ? { type: 'external', originalUrl, label: external[provider] } : null
}
