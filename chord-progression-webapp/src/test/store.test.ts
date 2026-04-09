import { describe, it, expect } from 'vitest'
import { getProgressionByKey, mapDegreeToFunction } from '../data/store'
import { MINOR_KEYS, MAJOR_KEYS, FORMULA_MINOR, FORMULA_MAJOR } from '../data/keys'
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
    expect(mapDegreeToFunction('iv', 'minor')).toBe('tonic')
  })

  it('major: IV/ii/vii° → subdominant, V7 → dominant, rest → tonic', () => {
    expect(mapDegreeToFunction('IV', 'major')).toBe('subdominant')
    expect(mapDegreeToFunction('V7', 'major')).toBe('dominant')
    expect(mapDegreeToFunction('I', 'major')).toBe('tonic')
  })
})

describe('computeChordsFromRoot', () => {
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

  it('Am minor matches known data', () => {
    const chords = computeChordsFromRoot('A', 'minor')
    // i=Am, iv=Dm, VII=G, III=C, VI=F, ii°=Em7b5, V7=E7
    expect(chords[0]).toBe('Am')
    expect(chords[1]).toBe('Dm')
    expect(chords[2]).toBe('G')
  })
})
