import { useState, useMemo } from 'react'
import type { ScaleMode, MusicalKey, ChordProgression } from './types'
import { getProgressionByKey, getVariations, PRACTICE_STEPS, mapDegreeToFunction } from './data/store'
import { FORMULA_MINOR, FORMULA_MAJOR, ROLE_DESCRIPTIONS_MINOR, ROLE_DESCRIPTIONS_MAJOR } from './data/keys'
import ModeToggle from './components/ModeToggle'
import CircleOfFifths from './components/CircleOfFifths'
import ChordProgressionDisplay from './components/ChordProgressionDisplay'
import VariationPanel from './components/VariationPanel'
import PracticeGuide from './components/PracticeGuide'
import CustomKeyBuilder from './components/CustomKeyBuilder'

const DEFAULT_KEY: Record<ScaleMode, string> = { minor: 'Em', major: 'C' }

function buildProgressionFromKey(key: MusicalKey): ChordProgression {
  const formula = key.mode === 'minor' ? FORMULA_MINOR : FORMULA_MAJOR
  const roles = key.mode === 'minor' ? ROLE_DESCRIPTIONS_MINOR : ROLE_DESCRIPTIONS_MAJOR
  return {
    key,
    formula,
    chordDetails: formula.map((degree, i) => ({
      degree,
      name: key.chords[i],
      function: mapDegreeToFunction(degree, key.mode),
      role: roles[degree] ?? '',
    })),
  }
}

export default function App() {
  const [mode, setMode] = useState<ScaleMode>('minor')
  const [selectedKey, setSelectedKey] = useState<string>('Em')
  const [customKey, setCustomKey] = useState<MusicalKey | null>(null)

  function handleModeChange(newMode: ScaleMode) {
    setMode(newMode)
    setSelectedKey(DEFAULT_KEY[newMode])
    setCustomKey(null)
  }

  function handleKeySelect(keyId: string, keyMode: ScaleMode) {
    setMode(keyMode)
    setSelectedKey(keyId)
    setCustomKey(null)
  }

  function handleCustomKey(key: MusicalKey) {
    setCustomKey(key)
    setMode(key.mode)
    setSelectedKey(key.id)
  }

  const progression = useMemo((): ChordProgression => {
    if (customKey) return buildProgressionFromKey(customKey)
    try {
      return getProgressionByKey(selectedKey, mode)
    } catch {
      return getProgressionByKey(DEFAULT_KEY[mode], mode)
    }
  }, [selectedKey, mode, customKey])

  const isMajor = mode === 'major'

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isMajor ? 'bg-gradient-to-br from-amber-950 via-orange-950 to-slate-900' : 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900'}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">🎵 Chord Progression Analyzer</h1>
          <p className="text-slate-400 text-sm font-mono">
            {isMajor ? 'I – IV – vii° – iii – vi – ii – V7' : 'i – iv – VII – III – VI – ii° – V7'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <ModeToggle currentMode={mode} onModeChange={handleModeChange} />
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">

          {/* Left: Circle of Fifths + Custom Builder */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <CircleOfFifths
              selectedKey={customKey ? '' : selectedKey}
              currentMode={mode}
              onKeySelect={handleKeySelect}
            />
            <CustomKeyBuilder onKeyGenerated={handleCustomKey} />
          </div>

          {/* Right: Chord display + panels */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            <ChordProgressionDisplay progression={progression} />
            <VariationPanel
              keyId={progression.key.id.replace('_custom', '')}
              getVariations={getVariations}
            />
            <PracticeGuide steps={PRACTICE_STEPS} />
          </div>
        </div>

        <footer className="text-center text-slate-600 text-xs mt-10">
          v3.0.0 · React + TypeScript · SVG Circle of Fifths
        </footer>
      </div>
    </div>
  )
}
