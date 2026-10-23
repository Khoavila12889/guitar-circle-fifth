import { useCallback, useEffect, useRef, useState } from 'react'

// Preserve the beat groupings and eighth-note tempo convention from 0c27318.
export const TIME_SIGNATURES = [
  { beats: 4, division: 4, label: '4/4', accents: [0, 2, 1, 2] },
  { beats: 3, division: 4, label: '3/4', accents: [0, 2, 2] },
  { beats: 2, division: 4, label: '2/4', accents: [0, 2] },
  { beats: 6, division: 8, label: '6/8', accents: [0, 2, 2, 1, 2, 2] },
  { beats: 9, division: 8, label: '9/8', accents: [0, 2, 2, 1, 2, 2, 1, 2, 2] },
  { beats: 12, division: 8, label: '12/8', accents: [0, 2, 2, 1, 2, 2, 1, 2, 2, 1, 2, 2] },
  { beats: 5, division: 4, label: '5/4', accents: [0, 2, 1, 2, 2] },
  { beats: 7, division: 8, label: '7/8', accents: [0, 2, 1, 2, 1, 2, 2] },
]
export type TimeSignature = typeof TIME_SIGNATURES[number]

export function useMetronome() {
  const [bpm, setBpmState] = useState(80)
  const [running, setRunning] = useState(false)
  const [beat, setBeat] = useState(0)
  const [volume, setVolumeState] = useState(0.6)
  const [timeSig, setTimeSigState] = useState(TIME_SIGNATURES[0])
  const [tapBpm, setTapBpm] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const taps = useRef<number[]>([])
  const context = useRef<AudioContext | null>(null)
  const master = useRef<GainNode | null>(null)
  const volumeRef = useRef(volume)

  const click = useCallback((accent: number) => {
    if (!context.current) {
      context.current = new AudioContext()
      master.current = context.current.createGain()
      master.current.gain.value = volumeRef.current
      master.current.connect(context.current.destination)
    }
    const ctx = context.current
    if (ctx.state === 'suspended') void ctx.resume()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.connect(gain)
    gain.connect(master.current!)
    oscillator.frequency.value = [1100, 880, 660][accent]
    gain.gain.setValueAtTime([1, 0.6, 0.35][accent], ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.07)
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
  }, [])

  const start = useCallback((tempo: number, signature: TimeSignature) => {
    if (timer.current !== null) clearInterval(timer.current)
    let currentBeat = 0
    setBeat(0)
    click(signature.accents[0])
    const interval = 60000 / tempo / (signature.division === 8 ? 2 : 1)
    timer.current = setInterval(() => {
      currentBeat = (currentBeat + 1) % signature.beats
      setBeat(currentBeat)
      click(signature.accents[currentBeat])
    }, interval)
    setRunning(true)
  }, [click])

  const stop = useCallback(() => {
    if (timer.current !== null) clearInterval(timer.current)
    timer.current = null
    setRunning(false)
    setBeat(0)
  }, [])

  useEffect(() => () => {
    if (timer.current !== null) clearInterval(timer.current)
    if (tapTimer.current !== null) clearTimeout(tapTimer.current)
    void context.current?.close()
    context.current = null
    master.current = null
  }, [])

  const setBpm = (value: number) => {
    const tempo = Math.min(200, Math.max(40, Math.round(value)))
    setBpmState(tempo)
    if (running) start(tempo, timeSig)
  }
  const setTimeSig = (signature: TimeSignature) => {
    setTimeSigState(signature)
    if (running) start(bpm, signature)
  }
  const setVolume = (value: number) => {
    setVolumeState(value)
    volumeRef.current = value
    if (master.current) master.current.gain.value = value
  }
  const resetTap = () => {
    taps.current = []
    setTapBpm(null)
    if (tapTimer.current !== null) clearTimeout(tapTimer.current)
  }
  const tap = () => {
    if (tapTimer.current !== null) clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(resetTap, 3000)
    taps.current.push(performance.now())
    taps.current = taps.current.slice(-8)
    if (taps.current.length < 2) return
    const duration = taps.current.at(-1)! - taps.current[0]
    const tempo = Math.min(200, Math.max(40, Math.round(60000 * (taps.current.length - 1) / duration)))
    setTapBpm(tempo)
    setBpm(tempo)
  }

  return { bpm, setBpm, running, beat, volume, setVolume, timeSig, setTimeSig,
    toggle: () => running ? stop() : start(bpm, timeSig), stop, tap, tapBpm, resetTap }
}
