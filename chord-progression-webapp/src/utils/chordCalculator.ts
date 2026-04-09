import type { ScaleMode, MusicalKey } from '../types'

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Enharmonic equivalents → normalize to sharps
const ENHARMONIC: Record<string, string> = {
  Db: 'C#', Eb: 'D#', Fb: 'E', Gb: 'F#', Ab: 'G#', Bb: 'A#', Cb: 'B',
}

const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10] // natural minor scale
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11] // major scale

// Degree sequence: [1,4,7,3,6,2,5] → scale indices [0,3,6,2,5,1,4]
const DEGREE_SEQUENCE_INDICES = [0, 3, 6, 2, 5, 1, 4]

// Chord quality per scale degree (0-indexed) for minor and major
const MINOR_CHORD_QUALITY = ['m', 'm', 'maj', 'maj', 'maj', 'dim7b5', '7']
const MAJOR_CHORD_QUALITY = ['maj', 'maj', 'dim', 'm', 'm', 'm', '7']

function normalizeRoot(root: string): string {
  if (ENHARMONIC[root]) return ENHARMONIC[root]
  return root
}

function buildChordName(note: string, quality: string): string {
  switch (quality) {
    case 'maj':     return note
    case 'm':       return `${note}m`
    case 'dim':     return `${note}dim`
    case 'dim7b5':  return `${note}m7b5`
    case '7':       return `${note}7`
    default:        return note
  }
}

export function computeChordsFromRoot(root: string, mode: ScaleMode): string[] {
  const normalized = normalizeRoot(root)
  const rootIndex = CHROMATIC_SCALE.indexOf(normalized)
  if (rootIndex === -1) throw new Error('Root note không hợp lệ')

  const intervals = mode === 'minor' ? MINOR_INTERVALS : MAJOR_INTERVALS
  const qualities = mode === 'minor' ? MINOR_CHORD_QUALITY : MAJOR_CHORD_QUALITY

  // Build 7-note scale
  const scale = intervals.map(i => CHROMATIC_SCALE[(rootIndex + i) % 12])

  // Apply degree sequence [1,4,7,3,6,2,5]
  return DEGREE_SEQUENCE_INDICES.map(idx => buildChordName(scale[idx], qualities[idx]))
}

export function computeKeyFromRoot(root: string, mode: ScaleMode): MusicalKey {
  const chords = computeChordsFromRoot(root, mode)
  const suffix = mode === 'minor' ? 'm' : ''
  const modeLabel = mode === 'minor' ? 'thứ' : 'trưởng'
  return {
    id: `${root}${suffix}_custom`,
    label: `${root}${suffix} (${root} ${modeLabel} - tùy chỉnh)`,
    mode,
    chords,
  }
}
