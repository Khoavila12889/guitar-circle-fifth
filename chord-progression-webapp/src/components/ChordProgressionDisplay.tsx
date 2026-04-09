import type { ChordProgression, HarmonicFunction } from '../types'

const FUNCTION_COLORS: Record<HarmonicFunction, string> = {
  tonic:       'bg-blue-900/60 border-blue-500/40 text-blue-100',
  subdominant: 'bg-green-900/60 border-green-500/40 text-green-100',
  dominant:    'bg-red-900/60 border-red-500/40 text-red-100',
}

const FUNCTION_BADGE: Record<HarmonicFunction, string> = {
  tonic:       'bg-blue-500/20 text-blue-300',
  subdominant: 'bg-green-500/20 text-green-300',
  dominant:    'bg-red-500/20 text-red-300',
}

interface Props {
  progression: ChordProgression
}

export default function ChordProgressionDisplay({ progression }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-lg font-bold text-white">{progression.key.label}</h2>
        <span className="text-slate-400 text-sm font-mono">
          {progression.formula.join(' – ')}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {progression.chordDetails.map((chord, i) => (
          <div
            key={i}
            className={`rounded-xl border p-2 flex flex-col items-center gap-1 ${FUNCTION_COLORS[chord.function]}`}
          >
            <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${FUNCTION_BADGE[chord.function]}`}>
              {chord.degree}
            </span>
            <span className="text-base font-bold leading-tight text-center">{chord.name}</span>
            <span className="text-[9px] text-center opacity-60 leading-tight hidden sm:block">
              {chord.role.split('—')[0].trim()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
