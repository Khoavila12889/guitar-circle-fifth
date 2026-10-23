// Fingering data recovered from gh-pages commit 0c27318.
export interface GuitarChord {
  name: string
  frets: number[]
  fingers: number[]
  barre?: { fret: number; from: number; to: number }
}
export const GUITAR_CHORDS: Record<string, GuitarChord> = {
  "C": {"name": "C", "frets": [-1, 3, 2, 0, 1, 0], "fingers": [0, 3, 2, 0, 1, 0]},
  "D": {"name": "D", "frets": [-1, -1, 0, 2, 3, 2], "fingers": [0, 0, 0, 1, 3, 2]},
  "E": {"name": "E", "frets": [0, 2, 2, 1, 0, 0], "fingers": [0, 2, 3, 1, 0, 0]},
  "F": {"name": "F", "frets": [1, 3, 3, 2, 1, 1], "fingers": [1, 3, 4, 2, 1, 1], "barre": {"fret": 1, "from": 0, "to": 5}},
  "G": {"name": "G", "frets": [3, 2, 0, 0, 0, 3], "fingers": [2, 1, 0, 0, 0, 3]},
  "A": {"name": "A", "frets": [-1, 0, 2, 2, 2, 0], "fingers": [0, 0, 1, 2, 3, 0]},
  "B": {"name": "B", "frets": [-1, 2, 4, 4, 4, 2], "fingers": [0, 1, 2, 3, 4, 1], "barre": {"fret": 2, "from": 1, "to": 5}},
  "Am": {"name": "Am", "frets": [-1, 0, 2, 2, 1, 0], "fingers": [0, 0, 2, 3, 1, 0]},
  "Bm": {"name": "Bm", "frets": [-1, 2, 4, 4, 3, 2], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 2, "from": 1, "to": 5}},
  "Cm": {"name": "Cm", "frets": [-1, 3, 5, 5, 4, 3], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 3, "from": 1, "to": 5}},
  "Dm": {"name": "Dm", "frets": [-1, -1, 0, 2, 3, 1], "fingers": [0, 0, 0, 2, 3, 1]},
  "Em": {"name": "Em", "frets": [0, 2, 2, 0, 0, 0], "fingers": [0, 2, 3, 0, 0, 0]},
  "Fm": {"name": "Fm", "frets": [1, 3, 3, 1, 1, 1], "fingers": [1, 3, 4, 1, 1, 1], "barre": {"fret": 1, "from": 0, "to": 5}},
  "Gm": {"name": "Gm", "frets": [3, 5, 5, 3, 3, 3], "fingers": [1, 3, 4, 1, 1, 1], "barre": {"fret": 3, "from": 0, "to": 5}},
  "F#m": {"name": "F#m", "frets": [2, 4, 4, 2, 2, 2], "fingers": [1, 3, 4, 1, 1, 1], "barre": {"fret": 2, "from": 0, "to": 5}},
  "C#m": {"name": "C#m", "frets": [-1, 4, 6, 6, 5, 4], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 4, "from": 1, "to": 5}},
  "G#m": {"name": "G#m", "frets": [4, 6, 6, 4, 4, 4], "fingers": [1, 3, 4, 1, 1, 1], "barre": {"fret": 4, "from": 0, "to": 5}},
  "D#m": {"name": "D#m", "frets": [-1, 6, 8, 8, 7, 6], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 6, "from": 1, "to": 5}},
  "Bbm": {"name": "Bbm", "frets": [-1, 1, 3, 3, 2, 1], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 1, "from": 1, "to": 5}},
  "B7": {"name": "B7", "frets": [-1, 2, 1, 2, 0, 2], "fingers": [0, 2, 1, 3, 0, 4]},
  "E7": {"name": "E7", "frets": [0, 2, 0, 1, 0, 0], "fingers": [0, 2, 0, 1, 0, 0]},
  "A7": {"name": "A7", "frets": [-1, 0, 2, 0, 2, 0], "fingers": [0, 0, 2, 0, 3, 0]},
  "D7": {"name": "D7", "frets": [-1, -1, 0, 2, 1, 2], "fingers": [0, 0, 0, 2, 1, 3]},
  "G7": {"name": "G7", "frets": [3, 2, 0, 0, 0, 1], "fingers": [3, 2, 0, 0, 0, 1]},
  "C7": {"name": "C7", "frets": [-1, 3, 2, 3, 1, 0], "fingers": [0, 3, 2, 4, 1, 0]},
  "C#7": {"name": "C#7", "frets": [-1, 4, 3, 4, 2, 4], "fingers": [0, 3, 2, 4, 1, 4]},
  "A#7": {"name": "A#7", "frets": [-1, 1, 3, 1, 3, 1], "fingers": [0, 1, 3, 1, 4, 1], "barre": {"fret": 1, "from": 1, "to": 5}},
  "Bm7b5": {"name": "Bm7b5", "frets": [-1, 2, 3, 2, 3, -1], "fingers": [0, 1, 3, 2, 4, 0]},
  "Em7b5": {"name": "Em7b5", "frets": [0, 1, 2, 0, 3, 0], "fingers": [0, 1, 2, 0, 3, 0]},
  "Am7b5": {"name": "Am7b5", "frets": [-1, 0, 1, 2, 1, 3], "fingers": [0, 0, 1, 3, 2, 4]},
  "Cm7b5": {"name": "Cm7b5", "frets": [-1, 3, 4, 3, 4, -1], "fingers": [0, 1, 3, 2, 4, 0]},
  "C#m7b5": {"name": "C#m7b5", "frets": [-1, 4, 5, 4, 5, -1], "fingers": [0, 1, 3, 2, 4, 0]},
  "D#m7b5": {"name": "D#m7b5", "frets": [-1, 6, 7, 6, 7, -1], "fingers": [0, 1, 3, 2, 4, 0]},
  "A#m7b5": {"name": "A#m7b5", "frets": [-1, 1, 2, 1, 2, -1], "fingers": [0, 1, 3, 2, 4, 0]},
  "Bdim": {"name": "Bdim", "frets": [-1, 2, 3, 4, 3, -1], "fingers": [0, 1, 2, 4, 3, 0]},
  "F#dim": {"name": "F#dim", "frets": [2, 3, 4, 2, -1, -1], "fingers": [1, 2, 4, 1, 0, 0]},
  "Adim": {"name": "Adim", "frets": [-1, 0, 1, 2, 1, -1], "fingers": [0, 0, 1, 3, 2, 0]},
  "Cmaj7": {"name": "Cmaj7", "frets": [-1, 3, 2, 0, 0, 0], "fingers": [0, 3, 2, 0, 0, 0]},
  "Gmaj7": {"name": "Gmaj7", "frets": [3, 2, 0, 0, 0, 2], "fingers": [3, 2, 0, 0, 0, 1]},
  "Dmaj7": {"name": "Dmaj7", "frets": [-1, -1, 0, 2, 2, 2], "fingers": [0, 0, 0, 1, 2, 3]},
  "Amaj7": {"name": "Amaj7", "frets": [-1, 0, 2, 1, 2, 0], "fingers": [0, 0, 3, 1, 4, 0]},
  "Emaj7": {"name": "Emaj7", "frets": [0, 2, 1, 1, 0, 0], "fingers": [0, 3, 1, 2, 0, 0]},
  "Fmaj7": {"name": "Fmaj7", "frets": [-1, -1, 3, 2, 1, 0], "fingers": [0, 0, 3, 2, 1, 0]},
  "Bbmaj7": {"name": "Bbmaj7", "frets": [-1, 1, 3, 2, 3, 1], "fingers": [0, 1, 3, 2, 4, 1]},
  "Eb": {"name": "Eb", "frets": [-1, 6, 8, 8, 8, 6], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 6, "from": 1, "to": 5}},
  "Ab": {"name": "Ab", "frets": [4, 6, 6, 5, 4, 4], "fingers": [1, 3, 4, 2, 1, 1], "barre": {"fret": 4, "from": 0, "to": 5}},
  "Db": {"name": "Db", "frets": [-1, 4, 6, 6, 6, 4], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 4, "from": 1, "to": 5}},
  "Gb": {"name": "Gb", "frets": [2, 4, 4, 3, 2, 2], "fingers": [1, 3, 4, 2, 1, 1], "barre": {"fret": 2, "from": 0, "to": 5}},
  "Bb": {"name": "Bb", "frets": [-1, 1, 3, 3, 3, 1], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 1, "from": 1, "to": 5}},
  "Ebm": {"name": "Ebm", "frets": [-1, 6, 8, 8, 7, 6], "fingers": [0, 1, 3, 4, 2, 1], "barre": {"fret": 6, "from": 1, "to": 5}},
  "Abm": {"name": "Abm", "frets": [4, 6, 6, 4, 4, 4], "fingers": [1, 3, 4, 1, 1, 1], "barre": {"fret": 4, "from": 0, "to": 5}},
}

const NATURAL_PITCH: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const PITCH_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Movable, standard-tuning shapes; arrays run from low E (string 6) to high e (string 1).
function movableChord(pitch: number, quality: string): GuitarChord {
  const eFret = (pitch - 4 + 12) % 12 || 12
  const aFret = (pitch - 9 + 12) % 12 || 12
  const templates: Record<string, { frets: number[]; fingers: number[]; aRoot?: boolean; barre?: boolean }> = {
    '': { frets: [0, 2, 2, 1, 0, 0], fingers: [1, 3, 4, 2, 1, 1], barre: true },
    m: { frets: [0, 2, 2, 0, 0, 0], fingers: [1, 3, 4, 1, 1, 1], barre: true },
    '7': { frets: [0, 2, 0, 1, 0, 0], fingers: [1, 3, 1, 2, 1, 1], barre: true },
    maj7: { frets: [-1, 0, 2, 1, 2, 0], fingers: [0, 1, 3, 2, 4, 1], aRoot: true, barre: true },
    dim: { frets: [-1, 0, 1, 2, 1, -1], fingers: [0, 1, 2, 4, 3, 0], aRoot: true },
    m7b5: { frets: [-1, 0, 1, 0, 1, -1], fingers: [0, 1, 3, 2, 4, 0], aRoot: true },
  }
  const template = templates[quality]
  const fret = template.aRoot ? aFret : eFret
  return {
    name: `${PITCH_NAMES[pitch]}${quality}`,
    frets: template.frets.map(offset => offset < 0 ? -1 : offset + fret),
    fingers: [...template.fingers],
    ...(template.barre ? { barre: { fret, from: template.aRoot ? 1 : 0, to: 5 } } : {}),
  }
}

// Replace inaccurate legacy shapes with consistent voicings, then fill every pitch/quality.
for (let pitch = 0; pitch < 12; pitch++) {
  for (const quality of ['', 'm', '7', 'dim', 'm7b5', 'maj7']) {
    const name = `${PITCH_NAMES[pitch]}${quality}`
    GUITAR_CHORDS[name] ??= movableChord(pitch, quality)
  }
}

/** Resolve enharmonic names (including double accidentals from custom keys), preserving the displayed spelling. */
export function getGuitarChord(name: string): GuitarChord | undefined {
  const match = /^([A-G])([#b]*)(m7b5|maj7|dim|m|7)?$/.exec(name)
  if (!match) return undefined
  const [, letter, accidentals, quality = ''] = match
  const offset = [...accidentals].reduce((sum, accidental) => sum + (accidental === '#' ? 1 : -1), 0)
  const pitch = ((NATURAL_PITCH[letter] + offset) % 12 + 12) % 12
  const chord = GUITAR_CHORDS[name] ?? GUITAR_CHORDS[`${PITCH_NAMES[pitch]}${quality}`]
  return chord ? { ...chord, name } : undefined
}
