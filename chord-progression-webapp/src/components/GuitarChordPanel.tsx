import { useState } from 'react'
import type { ChordDetail } from '../types'
import { getGuitarChord } from '../data/guitarChords'
import type { GuitarChord } from '../data/guitarChords'

const COLORS = { tonic: '#6366f1', subdominant: '#22c55e', dominant: '#ef4444' }

function ChordDiagram({ chord, color }: { chord: GuitarChord; color: string }) {
  const lowestFret = Math.min(...chord.frets.filter(fret => fret > 0))
  const startFret = Math.max(...chord.frets) > 4 ? lowestFret : 1
  const dx = 11.6
  const dy = 16.5
  return (
    <svg viewBox="0 0 88 108" className="w-full max-w-64 h-auto" role="img" aria-label={`Thế bấm ${chord.name}`}>
      <text x="40" y="10" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e2e8f0">{chord.name}</text>
      {startFret === 1
        ? <rect x="14" y="22" width="58" height="2.5" fill="#94a3b8" />
        : <text x="11" y="33" textAnchor="end" fontSize="7" fill="#e2e8f0">{startFret}</text>}
      {chord.barre && <rect x={14 + chord.barre.from * dx} y={22 + (chord.barre.fret - startFret + 0.5) * dy - 4.5}
        width={(chord.barre.to - chord.barre.from) * dx} height="9" rx="4.5" fill={color} />}
      {Array.from({ length: 5 }, (_, i) => <line key={`fret-${i}`} x1="14" x2="72" y1={22 + i * dy} y2={22 + i * dy} stroke="#334155" strokeWidth="0.8" />)}
      {chord.frets.map((fret, i) => {
        const x = 14 + i * dx
        const row = fret - startFret + 1
        return <g key={i}>
          <line x1={x} x2={x} y1="22" y2="88" stroke="#94a3b8" strokeWidth="0.8" />
          <text x={x} y="98" textAnchor="middle" fontSize="6" fill="#cbd5e1">{['E', 'A', 'D', 'G', 'B', 'e'][i]}</text>
          {fret === -1 && <text x={x} y="19" textAnchor="middle" fontSize="11" fill="#ef4444">×</text>}
          {fret === 0 && <circle cx={x} cy="16" r="3.5" fill="none" stroke="#94a3b8" />}
          {fret > 0 && row >= 1 && row <= 4 && <g>
            <circle cx={x} cy={22 + (row - 0.5) * dy} r="5" fill={color} />
            <text x={x} y={25 + (row - 0.5) * dy} textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">{chord.fingers[i] || ''}</text>
          </g>}
        </g>
      })}
    </svg>
  )
}

export default function GuitarChordPanel({ chordDetails }: { chordDetails: ChordDetail[] }) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  return <section className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
    <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5"
      aria-expanded={open} onClick={() => setOpen(!open)}>🎸 Thế bấm Guitar <span>{open ? '▲' : '▼'}</span></button>
    {open && <div className="px-4 pb-4">
      <div className="flex flex-wrap gap-2 mb-4">{chordDetails.map((chord, i) => <button key={i}
        disabled={!getGuitarChord(chord.name)} aria-pressed={selected === i}
        className={`min-h-11 px-3 py-2 rounded-lg text-base font-bold border disabled:opacity-30 ${selected === i ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/10 border-white/10 text-slate-200'}`}
        onClick={() => setSelected(selected === i ? null : i)}>{chord.name} <span className="text-[10px] opacity-60">{chord.degree}</span></button>)}</div>
      <div className={`grid gap-3 ${selected === null ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>{chordDetails.map((chord, i) => {
        if (selected !== null && selected !== i) return null
        const shape = getGuitarChord(chord.name)
        return <div key={i} className="min-w-0 flex flex-col items-center gap-2">
          <div className="w-full flex justify-center rounded-xl bg-slate-900/80 border border-white/10 p-2">
            {shape ? <ChordDiagram chord={shape} color={COLORS[chord.function]} /> : <p className="w-20 h-24 text-xs text-slate-500 flex items-center justify-center">Chưa có dữ liệu: {chord.name}</p>}
          </div>
          <span className="text-sm font-semibold text-slate-200">{chord.degree}</span>
          <span className="text-sm text-slate-300 text-center">{chord.role.split('—')[1]?.trim()}</span>
        </div>
      })}</div>
      <p className="text-sm leading-relaxed text-slate-300 mt-4">💡 Chạm tên hợp âm để phóng to; chạm lại để xem tất cả. Số trong chấm = ngón tay (1=trỏ, 2=giữa, 3=áp út, 4=út) · Thanh ngang = ngón chặn · ○ = dây buông · ✕ = không gảy. Dây từ trái sang phải: E trầm → e cao. Số bên trái = ngăn bắt đầu.</p>
    </div>}
  </section>
}
