import { act, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import PracticePlayer from '../components/PracticePlayer'
import GuitarChordPanel from '../components/GuitarChordPanel'
import { TIME_SIGNATURES, useMetronome } from '../hooks/useMetronome'
import { parsePracticeMedia } from '../utils/practiceMedia'
import { getProgressionByKey } from '../data/store'
import App from '../App'

const youtube = vi.hoisted(() => ({ destroy: vi.fn(), setVolume: vi.fn(), videoId: '' }))
vi.mock('../utils/youtubePlayer', () => ({
  loadYouTubeAPI: () => Promise.resolve({ Player: class {
    destroy = youtube.destroy
    setVolume = youtube.setVolume
    constructor(_element: HTMLElement, options: { videoId: string; events: { onReady: (event: { target: { setVolume: typeof youtube.setVolume } }) => void } }) {
      youtube.videoId = options.videoId
      options.events.onReady({ target: this })
    }
  } }),
}))

const audio = { clicks: vi.fn(), close: vi.fn(), gain: { value: 0 } }
class FakeAudioContext {
  currentTime = 0
  state = 'running'
  destination = {}
  close = audio.close
  createGain() {
    return { gain: { ...audio.gain, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn() }
  }
  createOscillator() {
    return { frequency: { value: 0 }, connect: vi.fn(), disconnect: vi.fn(), start: audio.clicks, stop: vi.fn() }
  }
}

let container: HTMLDivElement
let root: Root
beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
  vi.stubGlobal('AudioContext', FakeAudioContext)
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})
afterEach(() => {
  act(() => root.unmount())
  container.remove()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

function button(text: string) {
  const element = [...container.querySelectorAll('button')].find(item => item.textContent?.includes(text))
  expect(element, text).toBeDefined()
  return element!
}
function click(text: string) { act(() => button(text).click()) }
function enterUrl(url: string) {
  const input = container.querySelector<HTMLInputElement>('[aria-label="URL nhạc"]')!
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, url)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
  act(() => container.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })))
}

describe('practice media from the old deployed site', () => {
  it.each([
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'youtube'],
    ['https://youtu.be/dQw4w9WgXcQ?t=12', 'youtube'],
    ['https://youtube.com/shorts/dQw4w9WgXcQ', 'youtube'],
    ['https://youtube.com/embed/dQw4w9WgXcQ', 'youtube'],
    ['https://soundcloud.com/artist/track', 'soundcloud'],
    ['https://open.spotify.com/track/example', 'external'],
    ['https://zingmp3.vn/bai-hat/example', 'external'],
    ['https://www.nhaccuatui.com/bai-hat/example', 'external'],
    ['https://music.apple.com/vn/album/example', 'external'],
    ['https://nhac.vn/example', 'external'],
  ])('supports %s', (url, type) => expect(parsePracticeMedia(url)?.type).toBe(type))

  it.each(['', 'javascript:alert(1)', 'https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ', 'https://example.com/?soundcloud.com', 'https://youtube.com/watch?v=bad'])('rejects unsupported URL %s', url => {
    expect(parsePracticeMedia(url)).toBeNull()
  })

  it('loads YouTube, changes music volume, and destroys the player on clear', async () => {
    act(() => root.render(<PracticePlayer chordDetails={getProgressionByKey('Em', 'minor').chordDetails} keyLabel="Em" />))
    click('Thực chiến')
    await act(async () => enterUrl('https://youtu.be/dQw4w9WgXcQ'))
    expect(youtube.videoId).toBe('dQw4w9WgXcQ')
    expect(youtube.setVolume).toHaveBeenCalledWith(80)
    const volume = container.querySelector<HTMLInputElement>('[aria-label="Âm lượng nhạc nền"]')!
    act(() => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(volume, '25')
      volume.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(youtube.setVolume).toHaveBeenCalledWith(25)
    act(() => container.querySelector<HTMLButtonElement>('[aria-label="Xóa nhạc"]')!.click())
    expect(youtube.destroy).toHaveBeenCalled()
    expect(container.querySelector('[aria-label="Âm lượng nhạc nền"]')).toBeNull()
  })

  it('embeds SoundCloud, opens external media, rejects invalid input, and updates the chord strip', () => {
    const progression = getProgressionByKey('Em', 'minor')
    act(() => root.render(<PracticePlayer chordDetails={progression.chordDetails} keyLabel="Em" />))
    click('Thực chiến')
    enterUrl('https://soundcloud.com/artist/track')
    expect(container.querySelector('iframe')?.src).toContain('w.soundcloud.com/player/')
    enterUrl('https://open.spotify.com/track/example')
    expect(container.querySelector('iframe')).toBeNull()
    expect(container.querySelector('a')?.target).toBe('_blank')
    enterUrl('https://example.com')
    expect(container.querySelector('[role="alert"]')?.textContent).toContain('URL không được hỗ trợ')
    act(() => root.render(<PracticePlayer chordDetails={getProgressionByKey('C', 'major').chordDetails} keyLabel="C trưởng" />))
    expect(container.textContent).toContain('Vòng hợp âm — C trưởng')
  })
})

describe('metronome behavior', () => {
  let metro: ReturnType<typeof useMetronome>
  function Harness() {
    const value = useMetronome()
    useLayoutEffect(() => { metro = value })
    return null
  }
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'setTimeout', 'clearTimeout', 'performance'] })
    act(() => root.render(<Harness />))
  })

  it.each(TIME_SIGNATURES)('counts and wraps $label with the original beat interval', signature => {
    act(() => metro.setTimeSig(signature))
    act(() => metro.toggle())
    expect(metro.beat).toBe(0)
    expect(audio.clicks).toHaveBeenCalledTimes(1)
    const interval = 60000 / 80 / (signature.division === 8 ? 2 : 1)
    act(() => vi.advanceTimersByTime(interval))
    expect(metro.beat).toBe(1)
    act(() => vi.advanceTimersByTime(interval * (signature.beats - 1)))
    expect(metro.beat).toBe(0)
    act(() => metro.stop())
    const count = audio.clicks.mock.calls.length
    act(() => vi.advanceTimersByTime(3000))
    expect(audio.clicks).toHaveBeenCalledTimes(count)
  })

  it('restarts at the new tempo without duplicate timers; cleans up on unmount', () => {
    act(() => metro.toggle())
    act(() => metro.setBpm(120))
    const count = audio.clicks.mock.calls.length
    act(() => vi.advanceTimersByTime(1000))
    expect(audio.clicks).toHaveBeenCalledTimes(count + 2)
    act(() => root.unmount())
    const lastCount = audio.clicks.mock.calls.length
    act(() => vi.advanceTimersByTime(1000))
    expect(audio.clicks).toHaveBeenCalledTimes(lastCount)
    expect(audio.close).toHaveBeenCalledTimes(1)
    root = createRoot(container)
  })

  it('computes TAP tempo, resets after three seconds, and clamps BPM', () => {
    act(() => metro.tap())
    act(() => vi.advanceTimersByTime(500))
    act(() => metro.tap())
    expect(metro.tapBpm).toBe(120)
    expect(metro.bpm).toBe(120)
    act(() => vi.advanceTimersByTime(3000))
    expect(metro.tapBpm).toBeNull()
    act(() => metro.setBpm(500))
    expect(metro.bpm).toBe(200)
    act(() => metro.setBpm(1))
    expect(metro.bpm).toBe(40)
  })
})

it('restores guitar diagrams and individual chord selection', () => {
  act(() => root.render(<GuitarChordPanel chordDetails={getProgressionByKey('Em', 'minor').chordDetails} />))
  click('Thế bấm Guitar')
  expect(container.querySelectorAll('svg')).toHaveLength(7)
  click('Em')
  expect(container.querySelectorAll('svg')).toHaveLength(1)
  click('Em')
  expect(container.querySelectorAll('svg')).toHaveLength(7)
})

it('keeps practice, diagrams, variations, and guide reachable from the main app', () => {
  act(() => root.render(<App />))
  click('Thực chiến')
  expect(container.querySelector('[aria-label="URL nhạc"]')).not.toBeNull()
  expect(container.querySelector('[aria-label="BPM"]')).not.toBeNull()
  click('Thế bấm Guitar')
  expect(container.querySelectorAll('svg[aria-label^="Thế bấm"]')).toHaveLength(7)
  expect(button('Beginner')).toBeDefined()
  expect(button('Intermediate')).toBeDefined()
  expect(button('Advanced')).toBeDefined()
  expect(container.textContent).toContain('Hướng dẫn luyện tập')
})
