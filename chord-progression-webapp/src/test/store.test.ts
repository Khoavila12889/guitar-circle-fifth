import { describe, it, expect } from 'vitest'
import { getProgressionByKey, mapDegreeToFunction, getVariations } from '../data/store'
import { MINOR_KEYS, MAJOR_KEYS, FORMULA_MINOR, FORMULA_MAJOR, MAJOR_CIRCLE_ORDER } from '../data/keys'
import { computeChordsFromRoot } from '../utils/chordCalculator'

describe('getProgressionByKey - minor', () => {
  it('returns 7 chordDetails for all minor keys', () => {
    for (const key of MINOR_KEYS) {
      const prog = getProgressionByKey(key.id, 'minor')
      expect(prog.chordDetails).toHaveLength(7)
    }
  })

  it('formula order is always FORMULA_MINOR', () => {
    const prog = getProgressionByKey('Em', 'minor')
    prog.chordDetails.forEach((d, i) => expect(d.degree).toBe(FORMULA_MINOR[i]))
  })

  it('throws for invalid key', () => {
    expect(() => getProgressionByKey('Xyz', 'minor')).toThrow('Key không được hỗ trợ')
  })
})

describe('getProgressionByKey - major', () => {
  it('returns 7 chordDetails for all major keys', () => {
    for (const key of MAJOR_KEYS) {
      const prog = getProgressionByKey(key.id, 'major')
      expect(prog.chordDetails).toHaveLength(7)
    }
  })

  it('formula order is always FORMULA_MAJOR', () => {
    const prog = getProgressionByKey('C', 'major')
    prog.chordDetails.forEach((d, i) => expect(d.degree).toBe(FORMULA_MAJOR[i]))
  })
})

describe('mapDegreeToFunction', () => {
  it('minor: ii° → subdominant, V7 → dominant, rest → tonic', () => {
    expect(mapDegreeToFunction('ii°', 'minor')).toBe('subdominant')
    expect(mapDegreeToFunction('V7', 'minor')).toBe('dominant')
    expect(mapDegreeToFunction('i', 'minor')).toBe('tonic')
    expect(mapDegreeToFunction('iv', 'minor')).toBe('subdominant')
  })

  it('major: IV/ii are subdominant; vii° and V7 are dominant', () => {
    expect(mapDegreeToFunction('IV', 'major')).toBe('subdominant')
    expect(mapDegreeToFunction('ii', 'major')).toBe('subdominant')
    expect(mapDegreeToFunction('vii°', 'major')).toBe('dominant')
    expect(mapDegreeToFunction('V7', 'major')).toBe('dominant')
    expect(mapDegreeToFunction('I', 'major')).toBe('tonic')
  })
})

describe('computeChordsFromRoot', () => {
  it('matches every preset including flat and sharp spellings', () => {
    for (const key of [...MINOR_KEYS, ...MAJOR_KEYS]) {
      const root = key.mode === 'minor' ? key.id.slice(0, -1) : key.id
      expect(computeChordsFromRoot(root, key.mode), key.id).toEqual(key.chords)
    }
  })

  it('preserves flat roots and theoretical sharp spellings', () => {
    expect(computeChordsFromRoot('Db', 'major')).toEqual([
      'Db', 'Gb', 'Cdim', 'Fm', 'Bbm', 'Ebm', 'Ab7',
    ])
    expect(computeChordsFromRoot('G#', 'major')).toEqual([
      'G#', 'C#', 'F##dim', 'B#m', 'E#m', 'A#m', 'D#7',
    ])
  })
  it('returns 7 chords for valid root', () => {
    expect(computeChordsFromRoot('C', 'major')).toHaveLength(7)
    expect(computeChordsFromRoot('A', 'minor')).toHaveLength(7)
    expect(computeChordsFromRoot('F#', 'minor')).toHaveLength(7)
  })

  it('handles enharmonic equivalents', () => {
    expect(computeChordsFromRoot('Bb', 'minor')).toHaveLength(7)
    expect(computeChordsFromRoot('Db', 'major')).toHaveLength(7)
  })

  it('throws for invalid root', () => {
    expect(() => computeChordsFromRoot('X', 'minor')).toThrow('Root note không hợp lệ')
    expect(() => computeChordsFromRoot('', 'major')).toThrow('Root note không hợp lệ')
  })

  it('Am minor matches the full diatonic progression', () => {
    expect(computeChordsFromRoot('A', 'minor')).toEqual([
      'Am', 'Dm', 'G', 'C', 'F', 'Bm7b5', 'E7',
    ])
  })

  it('C major matches the full diatonic progression', () => {
    expect(computeChordsFromRoot('C', 'major')).toEqual([
      'C', 'F', 'Bdim', 'Em', 'Am', 'Dm', 'G7',
    ])
  })

  it('all major keys shown in the circle have progression data', () => {
    expect(MAJOR_KEYS.map(key => key.id)).toEqual(MAJOR_CIRCLE_ORDER)
    for (const keyId of MAJOR_CIRCLE_ORDER) {
      expect(() => getProgressionByKey(keyId, 'major')).not.toThrow()
    }
  })

  it('Fm and Bbm contain correct ii diminished chords', () => {
    expect(getProgressionByKey('Fm', 'minor').chordDetails.map(chord => chord.name)).toEqual([
      'Fm', 'Bbm', 'Eb', 'Ab', 'Db', 'Gm7b5', 'C7',
    ])
    expect(getProgressionByKey('Bbm', 'minor').chordDetails.map(chord => chord.name)).toEqual([
      'Bbm', 'Ebm', 'Ab', 'Db', 'Gb', 'Cm7b5', 'F7',
    ])
  })
})

describe('getVariations', () => {
  it('uses the selected major key instead of Em', () => {
    expect(getVariations('Bb', 'intermediate')[0]).toBe(
      'Chơi toàn bộ vòng: Bb – Eb – Adim – Dm – Gm – Cm – F7 – Bb.',
    )
  })

  it('supports custom minor keys at all levels', () => {
    for (const level of ['beginner', 'intermediate', 'advanced'] as const) {
      const tips = getVariations('F#m_custom', level).join(' ')
      expect(tips).toContain('F#m')
      expect(tips).toContain('C#7')
      expect(tips).not.toContain('B7')
    }
  })
})
