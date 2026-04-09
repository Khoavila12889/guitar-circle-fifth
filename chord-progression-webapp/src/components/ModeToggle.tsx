import type { ScaleMode } from '../types'

interface Props {
  currentMode: ScaleMode
  onModeChange: (mode: ScaleMode) => void
}

export default function ModeToggle({ currentMode, onModeChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
      <button
        onClick={() => onModeChange('minor')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
          currentMode === 'minor'
            ? 'bg-indigo-600 text-white shadow'
            : 'text-white/60 hover:text-white'
        }`}
      >
        ♭ Minor
      </button>
      <button
        onClick={() => onModeChange('major')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
          currentMode === 'major'
            ? 'bg-amber-500 text-white shadow'
            : 'text-white/60 hover:text-white'
        }`}
      >
        ♯ Major
      </button>
    </div>
  )
}
