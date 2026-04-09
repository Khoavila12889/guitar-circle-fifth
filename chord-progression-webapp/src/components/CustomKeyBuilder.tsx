import { useState } from 'react'
import type { ScaleMode, MusicalKey } from '../types'
import { computeKeyFromRoot } from '../utils/chordCalculator'

interface Props {
  onKeyGenerated: (key: MusicalKey) => void
}

const VALID_ROOTS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']

export default function CustomKeyBuilder({ onKeyGenerated }: Props) {
  const [root, setRoot] = useState('')
  const [mode, setMode] = useState<ScaleMode>('minor')
  const [error, setError] = useState('')

  function handleGenerate() {
    const trimmed = root.trim()
    if (!trimmed) { setError('Nhập tông gốc (vd: F#, Bb, C)'); return }
    try {
      const key = computeKeyFromRoot(trimmed, mode)
      setError('')
      onKeyGenerated(key)
    } catch {
      setError('Tông không hợp lệ. Dùng: ' + VALID_ROOTS.join(', '))
    }
  }

  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">🎹 Tự tạo tông</h3>
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={root}
          onChange={e => { setRoot(e.target.value); setError('') }}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          placeholder="Tông gốc (vd: F#)"
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm w-32 placeholder:text-slate-500 focus:outline-none focus:border-indigo-400"
        />
        <div className="flex gap-1 bg-white/10 rounded-lg p-1">
          {(['minor', 'major'] as ScaleMode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                mode === m
                  ? m === 'minor' ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m === 'minor' ? 'Minor' : 'Major'}
            </button>
          ))}
        </div>
        <button
          onClick={handleGenerate}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded-lg font-semibold transition-all"
        >
          Tạo
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  )
}
