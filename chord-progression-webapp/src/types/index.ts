export type ScaleMode = 'minor' | 'major'

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export type HarmonicFunction = 'tonic' | 'subdominant' | 'dominant'

export interface MusicalKey {
  id: string
  label: string
  mode: ScaleMode
  chords: string[] // exactly 7 chords
  isVietnamesePopular?: boolean
}

export interface ChordDetail {
  degree: string
  name: string
  function: HarmonicFunction
  role: string
}

export interface ChordProgression {
  key: MusicalKey
  formula: string[]
  chordDetails: ChordDetail[]
}

export interface VariationSet {
  key: string
  beginner: string[]
  intermediate: string[]
  advanced: string[]
}

export interface PracticeStep {
  order: number
  title: string
  description: string
}
