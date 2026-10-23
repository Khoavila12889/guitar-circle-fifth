import { describe, expect, it } from 'vitest'
import { GUITAR_CHORDS, getGuitarChord } from '../data/guitarChords'
import { MAJOR_KEYS, MINOR_KEYS } from '../data/keys'
import { computeChordsFromRoot } from '../utils/chordCalculator'

describe('teaching guitar voicings', () => {
  it('covers every built-in and custom progression, including double accidentals', () => {
    const names = [...MAJOR_KEYS, ...MINOR_KEYS].flatMap(key => key.chords)
    for (const letter of 'CDEFGAB') for (const accidental of ['', '#', 'b']) {
      for (const mode of ['major', 'minor'] as const) names.push(...computeChordsFromRoot(letter + accidental, mode))
    }
    for (const name of names) expect(getGuitarChord(name), name).toBeDefined()
  })

  it('plays exactly the advertised chord tones with visible, numbered fingers', () => {
    const natural: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
    const intervals: Record<string, number[]> = { '': [0, 4, 7], m: [0, 3, 7], '7': [0, 4, 7, 10], dim: [0, 3, 6], m7b5: [0, 3, 6, 10], maj7: [0, 4, 7, 11] }
    for (const [name, chord] of Object.entries(GUITAR_CHORDS)) {
      const [, letter, accidental, quality] = /^([A-G])([#b]?)(.*)$/.exec(name)!
      const root = natural[letter] + (accidental === '#' ? 1 : accidental === 'b' ? -1 : 0)
      const pitches = chord.frets.flatMap((fret, i) => fret < 0 ? [] : [([4, 9, 2, 7, 11, 4][i] + fret - root + 24) % 12])
      const tones = new Set(pitches)
      for (const tone of tones) expect(intervals[quality], name).toContain(tone)
      // Seventh-chord voicings may omit the perfect fifth, but must retain root, third and seventh.
      for (const tone of intervals[quality]) {
        if (tone === 7 && (quality === '7' || quality === 'maj7')) continue
        expect(tones.has(tone), `${name}: missing ${tone}`).toBe(true)
      }
      const lowest = Math.min(...chord.frets.filter(fret => fret > 0))
      const start = Math.max(...chord.frets) > 4 ? lowest : 1
      chord.frets.forEach((fret, i) => {
        if (fret > 0) {
          expect(fret - start, name).toBeLessThan(4)
          expect(chord.fingers[i], name).toBeGreaterThanOrEqual(1)
          expect(chord.fingers[i], name).toBeLessThanOrEqual(4)
        } else expect(chord.fingers[i], name).toBe(0)
      })
      if (chord.barre) for (let i = chord.barre.from; i <= chord.barre.to; i++) {
        expect(chord.frets[i], name).toBeGreaterThanOrEqual(chord.barre.fret)
      }
    }
  })
})
