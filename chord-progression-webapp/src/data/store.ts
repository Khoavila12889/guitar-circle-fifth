import type { ScaleMode, ChordProgression, ChordDetail, HarmonicFunction, MusicalKey, VariationSet, PracticeStep } from '../types'
import {
  MINOR_KEYS, MAJOR_KEYS,
  FORMULA_MINOR, FORMULA_MAJOR,
  ROLE_DESCRIPTIONS_MINOR, ROLE_DESCRIPTIONS_MAJOR,
} from './keys'

export function mapDegreeToFunction(degree: string, mode: ScaleMode): HarmonicFunction {
  if (mode === 'minor') {
    if (degree === 'ii°') return 'subdominant'
    if (degree === 'V7')  return 'dominant'
    return 'tonic'
  } else {
    if (degree === 'IV' || degree === 'ii' || degree === 'vii°') return 'subdominant'
    if (degree === 'V7') return 'dominant'
    return 'tonic'
  }
}

export function getProgressionByKey(keyId: string, mode: ScaleMode): ChordProgression {
  const keys = mode === 'minor' ? MINOR_KEYS : MAJOR_KEYS
  const key = keys.find(k => k.id === keyId)
  if (!key) throw new Error(`Key không được hỗ trợ: ${keyId}`)

  const formula = mode === 'minor' ? FORMULA_MINOR : FORMULA_MAJOR
  const roles = mode === 'minor' ? ROLE_DESCRIPTIONS_MINOR : ROLE_DESCRIPTIONS_MAJOR

  const chordDetails: ChordDetail[] = formula.map((degree, i) => ({
    degree,
    name: key.chords[i],
    function: mapDegreeToFunction(degree, mode),
    role: roles[degree] ?? '',
  }))

  return { key, formula, chordDetails }
}

export function getKeysByMode(mode: ScaleMode): MusicalKey[] {
  return mode === 'minor' ? MINOR_KEYS : MAJOR_KEYS
}

export const VARIATIONS: Record<string, VariationSet> = {
  Em: {
    key: 'Em',
    beginner: [
      'Thay F#m7b5 (ii°) bằng F#m thông thường nếu khó bấm.',
      'Rút gọn thành 4 bậc: Em - D - C - B7 (i - VII - VI - V7).',
    ],
    intermediate: [
      'Walking Bass: Em - Am/E - D/F# - G - C - F#m7b5 - B7/D#',
      'Passing chord: C - C#° - F#m7b5 (VI - #iv° - ii°) tạo chromatic motion.',
    ],
    advanced: [
      'Thêm tensions: Emaj7, Am7, Dmaj7, Gmaj7, Cmaj7 để tăng độ jazz/lofi.',
      'Tritone Sub: thay B7 bằng F7 — giải quyết về Em rất chromatic.',
      'Secondary dominant: thêm E7 trước Am (V7/IV).',
    ],
  },
  Am: {
    key: 'Am',
    beginner: [
      'Thay Bm7b5 (ii°) bằng Bm thông thường.',
      'Rút gọn: Am - G - F - E7.',
    ],
    intermediate: [
      'Walking Bass: Am - Dm/A - G/B - C - F - Bm7b5 - E7/G#',
      'Passing chord: F - F#° - Bm7b5.',
    ],
    advanced: [
      'Tensions: Amaj7, Dm7, Gmaj7, Cmaj7, Fmaj7.',
      'Tritone Sub: thay E7 bằng Bb7.',
      'Secondary dominant: thêm A7 trước Dm.',
    ],
  },
  Dm: {
    key: 'Dm',
    beginner: [
      'Thay Em7b5 bằng Em.',
      'Rút gọn: Dm - C - Bb - A7.',
    ],
    intermediate: [
      'Walking Bass: Dm - Gm/D - C/E - F - Bb - Em7b5 - A7/C#',
      'Passing chord: Bb - B° - Em7b5.',
    ],
    advanced: [
      'Tensions: Dmaj7, Gm7, Cmaj7, Fmaj7, Bbmaj7.',
      'Tritone Sub: thay A7 bằng Eb7.',
      'Secondary dominant: thêm D7 trước Gm.',
    ],
  },
}

export const PRACTICE_STEPS: PracticeStep[] = [
  { order: 1, title: 'Học thuộc 1 tông duy nhất trước', description: 'Em hoặc Am là dễ nhất trên Guitar. Nắm chắc 7 hợp âm theo thứ tự i - iv - VII - III - VI - ii° - V7.' },
  { order: 2, title: 'Dùng vòng ngũ sắc để suy luận tông mới', description: 'Dùng Circle of Fifths để suy luận các tông tiếp theo theo chiều kim đồng hồ (Em → Bm → F#m...).' },
  { order: 3, title: 'Luyện tai nghe (Ear Training)', description: 'Thử chơi cùng 1 bài nhưng ở 3 tông khác nhau để luyện khả năng nhận biết màu sắc hòa thanh.' },
  { order: 4, title: 'Tập từng đoạn 2–3 bậc rồi ghép lại', description: 'Chia nhỏ: (i - iv), (VII - III), (VI - ii° - V7 - i). Luyện từng đoạn trước khi chơi toàn bộ vòng.' },
]

export function getVariations(keyId: string, level: 'beginner' | 'intermediate' | 'advanced'): string[] {
  const set = VARIATIONS[keyId]
  if (!set) return VARIATIONS['Em'][level] // fallback
  return set[level] ?? set.beginner
}
