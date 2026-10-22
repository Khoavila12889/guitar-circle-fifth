import type { ScaleMode, MusicalKey } from '../types'

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const NATURAL_PITCHES = [0, 2, 4, 5, 7, 9, 11]

const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10] // natural minor scale
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11] // major scale

// Degree sequence: [1,4,7,3,6,2,5] → scale indices [0,3,6,2,5,1,4]
const DEGREE_SEQUENCE_INDICES = [0, 3, 6, 2, 5, 1, 4]

// Chord quality per scale degree (I–VII), indexed by scale position.
const MINOR_CHORD_QUALITY = ['m', 'dim7b5', 'maj', 'm', '7', 'maj', 'maj']
const MAJOR_CHORD_QUALITY = ['maj', 'm', 'm', 'maj', '7', 'm', 'dim']

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
  if (!/^[A-G][#b]?$/.test(root)) throw new Error('Root note không hợp lệ')
  const letterIndex = LETTERS.indexOf(root[0])
  const rootPitch = NATURAL_PITCHES[letterIndex] + (root[1] === '#' ? 1 : root[1] === 'b' ? -1 : 0)

  const intervals = mode === 'minor' ? MINOR_INTERVALS : MAJOR_INTERVALS
  const qualities = mode === 'minor' ? MINOR_CHORD_QUALITY : MAJOR_CHORD_QUALITY

  // Build 7-note scale
  const scale = intervals.map((interval, i) => {
    const index = (letterIndex + i) % 7
    const difference = ((rootPitch + interval - NATURAL_PITCHES[index] + 18) % 12) - 6
    const accidental = difference < 0 ? 'b'.repeat(-difference) : '#'.repeat(difference)
    return LETTERS[index] + accidental
  })

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
