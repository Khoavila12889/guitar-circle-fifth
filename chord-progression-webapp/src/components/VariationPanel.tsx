import { useState } from 'react'
import type { SkillLevel } from '../types'

interface Props {
  keyId: string
  getVariations: (keyId: string, level: SkillLevel) => string[]
}

const LEVELS: { id: SkillLevel; label: string; color: string }[] = [
  { id: 'beginner',     label: '🌱 Beginner',     color: 'text-emerald-400 border-emerald-500' },
  { id: 'intermediate', label: '🎸 Intermediate', color: 'text-yellow-400 border-yellow-500' },
  { id: 'advanced',     label: '🔥 Advanced',     color: 'text-red-400 border-red-500' },
]

export default function VariationPanel({ keyId, getVariations }: Props) {
  const [level, setLevel] = useState<SkillLevel>('beginner')
  const items = getVariations(keyId, level)

  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">🎵 Biến thể & Gợi ý</h3>
      <div className="flex gap-2 mb-3 flex-wrap">
        {LEVELS.map(l => (
          <button
            key={l.id}
            onClick={() => setLevel(l.id)}
            className={`text-xs px-3 py-1 rounded-full border transition-all ${
              level === l.id ? `${l.color} bg-white/10` : 'border-white/10 text-slate-500 hover:text-slate-300'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {items.map((tip, i) => (
          <li key={i} className="text-sm text-slate-300 flex gap-2">
            <span className="text-slate-500 shrink-0">{i + 1}.</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
