import { useEffect, useRef, useState } from 'react'
import type { ChordDetail } from '../types'
import { TIME_SIGNATURES, useMetronome } from '../hooks/useMetronome'
import { parsePracticeMedia } from '../utils/practiceMedia'
import type { PracticeMedia } from '../utils/practiceMedia'
import { loadYouTubeAPI } from '../utils/youtubePlayer'
import type { YouTubePlayer } from '../utils/youtubePlayer'

function YouTubeEmbed({ media, volume }: { media: PracticeMedia; volume: number }) {
  const container = useRef<HTMLDivElement>(null)
  const player = useRef<YouTubePlayer | null>(null)
  const volumeRef = useRef(volume)
  const [error, setError] = useState('')
  useEffect(() => {
    volumeRef.current = volume
    player.current?.setVolume(volume)
  }, [volume])
  useEffect(() => {
    let cancelled = false
    loadYouTubeAPI().then(api => {
      if (cancelled || !container.current) return
      const mount = document.createElement('div')
      container.current.replaceChildren(mount)
      player.current = new api.Player(mount, {
        height: '220', width: '100%', videoId: media.videoId!,
        playerVars: { autoplay: 1, rel: 0 },
        events: { onReady: event => { if (!cancelled) event.target.setVolume(volumeRef.current) } },
      })
    }).catch((reason: Error) => { if (!cancelled) setError(reason.message) })
    return () => {
      cancelled = true
      player.current?.destroy()
      player.current = null
    }
  }, [media])
  return <div>
    <div ref={container} className="rounded-xl overflow-hidden border border-white/10 w-full" />
    {error && <p role="alert" className="text-red-400 text-xs">{error}</p>}
    <a className="text-xs text-indigo-300" href={media.originalUrl} target="_blank" rel="noopener noreferrer">Mở YouTube ↗</a>
  </div>
}

export default function PracticePlayer({ chordDetails, keyLabel }: { chordDetails: ChordDetail[]; keyLabel: string }) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [media, setMedia] = useState<PracticeMedia | null>(null)
  const [error, setError] = useState('')
  const [musicVolume, setMusicVolume] = useState(80)
  const metronome = useMetronome()
  const button = 'px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white'
  const play = () => {
    if (!url.trim()) { setError('Nhập URL nhạc'); return }
    const parsed = parsePracticeMedia(url)
    if (!parsed) { setError('URL không được hỗ trợ. Thử YouTube hoặc SoundCloud.'); return }
    setError('')
    setMedia(parsed)
    metronome.stop()
  }
  const clear = () => {
    setMedia(null)
    setUrl('')
    setError('')
    metronome.stop()
  }
  return <section className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
    <button aria-expanded={open} onClick={() => setOpen(!open)}
      className="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-white/5 text-sm font-semibold text-slate-300 text-left">
      <span>🎧 Thực chiến — Phát nhạc &amp; Luyện tập <span className="text-xs text-slate-500 font-normal">YouTube · SoundCloud</span></span>
      <span>{open ? '▲' : '▼'}</span>
    </button>
    {open && <div className="px-4 pb-5 space-y-4">
      <form className="flex gap-2 flex-wrap" onSubmit={event => { event.preventDefault(); play() }}>
        <input aria-label="URL nhạc" type="text" value={url} onChange={event => { setUrl(event.target.value); setError('') }}
          placeholder="Dán URL YouTube hoặc SoundCloud..."
          className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-400" />
        <button className={button} type="submit">Phát</button>
        {media && <button type="button" aria-label="Xóa nhạc" onClick={clear} className="px-3 py-2 rounded-lg bg-white/10 text-slate-300">✕</button>}
      </form>
      {error && <p role="alert" className="text-red-400 text-xs">{error}</p>}
      {!media && <div className="text-xs text-slate-400 space-y-1">
        <p>✅ YouTube — embed + điều chỉnh âm lượng</p>
        <p>✅ SoundCloud — embed trực tiếp</p>
        <p>🔗 Zing MP3 / Spotify / NhacCuaTui / Apple Music / Nhac.vn — mở tab mới</p>
      </div>}
      {media?.type === 'external' && <div className="bg-amber-900/30 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between gap-3">
        <div><p className="text-amber-300 text-sm font-semibold">{media.label} không hỗ trợ embed</p>
          <p className="text-amber-400/70 text-xs mt-0.5">Mở tab mới, quay lại đây để xem chord &amp; dùng metronome</p></div>
        <a href={media.originalUrl} target="_blank" rel="noopener noreferrer" className="bg-amber-500 text-black text-xs font-bold px-3 py-2 rounded-lg shrink-0">Mở {media.label} ↗</a>
      </div>}
      {media?.type === 'youtube' && <div className="space-y-2">
        <YouTubeEmbed key={media.originalUrl} media={media} volume={musicVolume} />
        <label className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 text-xs text-slate-400">
          🔊 Nhạc nền <input aria-label="Âm lượng nhạc nền" type="range" min="0" max="100" value={musicVolume}
            onChange={event => setMusicVolume(Number(event.target.value))} className="flex-1 min-w-0 accent-amber-500" /> {musicVolume}%
        </label>
      </div>}
      {media?.type === 'soundcloud' && <iframe title="SoundCloud player" src={media.embedUrl} width="100%" height="120" allow="autoplay" className="block rounded-xl border border-white/10" />}
      <div className="bg-white/5 rounded-xl p-3">
        <p className="text-xs text-slate-400 mb-2 font-semibold">🎵 Vòng hợp âm — {keyLabel}</p>
        <div className="flex flex-wrap gap-2">{chordDetails.map((chord, i) => <div key={i} className="flex flex-col items-center bg-white/10 rounded-lg px-2.5 py-1.5 min-w-[44px]">
          <span className="text-[9px] text-slate-500 font-mono">{chord.degree}</span><span className="text-sm font-bold text-white">{chord.name}</span>
        </div>)}</div>
      </div>
      <div className="bg-white/5 rounded-xl p-3 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <h3 className="font-semibold">🥁 Metronome</h3><output aria-label="Tempo">{metronome.bpm} BPM · {metronome.timeSig.label}</output>
        </div>
        <div className="flex flex-wrap gap-1.5">{TIME_SIGNATURES.map(signature => <button key={signature.label}
          aria-pressed={metronome.timeSig.label === signature.label} onClick={() => metronome.setTimeSig(signature)}
          className={`text-xs px-2.5 py-1.5 rounded-lg font-mono font-bold border ${metronome.timeSig.label === signature.label ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/10 border-white/10 text-slate-400'}`}>{signature.label}</button>)}</div>
        <div role="group" aria-label="Đếm nhịp" className="flex gap-1.5 justify-center items-center flex-wrap">
          {metronome.timeSig.accents.map((accent, i) => <div key={i} aria-label={`Phách ${i + 1}`} aria-current={metronome.running && metronome.beat === i ? 'step' : undefined}
            className={`rounded-full flex items-center justify-center text-xs transition-all duration-75 ${accent === 0 ? 'w-9 h-9' : accent === 1 ? 'w-7 h-7' : 'w-6 h-6'} ${metronome.running && metronome.beat === i ? 'bg-amber-400 scale-110 text-slate-950' : 'bg-slate-600 text-slate-200'}`}>{i + 1}</div>)}
        </div>
        <div className="flex gap-2">
          <button onClick={metronome.tap} className="flex-1 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/40 text-amber-300 font-bold text-sm select-none">👆 TAP {metronome.tapBpm && `→ ${metronome.tapBpm} BPM`}</button>
          {metronome.tapBpm && <button onClick={metronome.resetTap} aria-label="Reset tap" className="px-3 rounded-xl bg-white/10 text-slate-400">↺</button>}
        </div>
        {metronome.tapBpm && <p className="text-xs text-amber-400 text-center">Đã bắt nhịp: {metronome.tapBpm} BPM — nhấn ▶ để chạy</p>}
        <label className="flex items-center gap-3 text-xs text-slate-500">40
          <input aria-label="BPM" type="range" min="40" max="200" value={metronome.bpm} className="flex-1 min-w-0 accent-indigo-500"
            onChange={event => { metronome.setBpm(Number(event.target.value)); metronome.resetTap() }} />200
        </label>
        <div className="flex gap-1.5 flex-wrap">{[60, 70, 80, 90, 100, 120, 140].map(tempo => <button key={tempo}
          onClick={() => { metronome.setBpm(tempo); metronome.resetTap() }}
          className={`text-xs px-2 py-1 rounded ${metronome.bpm === tempo ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400'}`}>{tempo}</button>)}</div>
        <label className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 text-xs text-slate-400">🔊 Metronome
          <input aria-label="Âm lượng metronome" type="range" min="0" max="1" step="0.05" value={metronome.volume}
            onChange={event => metronome.setVolume(Number(event.target.value))} className="flex-1 min-w-0 accent-indigo-500" />{Math.round(metronome.volume * 100)}%
        </label>
        <button onClick={metronome.toggle} className={`w-full py-2 rounded-lg text-sm font-bold text-white ${metronome.running ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>{metronome.running ? '⏹ Dừng' : '▶ Bắt đầu'}</button>
      </div>
    </div>}
  </section>
}
