import type { ScaleMode, ChordProgression, ChordDetail, HarmonicFunction, MusicalKey, PracticeStep } from '../types'
import { computeKeyFromRoot } from '../utils/chordCalculator'
import {
  MINOR_KEYS, MAJOR_KEYS,
  FORMULA_MINOR, FORMULA_MAJOR,
  ROLE_DESCRIPTIONS_MINOR, ROLE_DESCRIPTIONS_MAJOR,
} from './keys'

export function mapDegreeToFunction(degree: string, mode: ScaleMode): HarmonicFunction {
  if (mode === 'minor') {
    if (degree === 'iv' || degree === 'ii°') return 'subdominant'
    if (degree === 'V7') return 'dominant'
    return 'tonic'
  }
  if (degree === 'IV' || degree === 'ii') return 'subdominant'
  if (degree === 'vii°' || degree === 'V7') return 'dominant'
  return 'tonic'
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

export const PRACTICE_STEPS: PracticeStep[] = [
  { order: 1, title: 'Học thuộc 1 tông duy nhất trước', description: 'Em hoặc Am là dễ nhất trên Guitar. Nắm chắc 7 hợp âm theo thứ tự i - iv - VII - III - VI - ii° - V7.' },
  { order: 2, title: 'Dùng vòng quãng năm để suy luận tông mới', description: 'Dùng Circle of Fifths để suy luận các tông tiếp theo theo chiều kim đồng hồ (Em → Bm → F#m...).' },
  { order: 3, title: 'Luyện tai nghe (Ear Training)', description: 'Thử chơi cùng 1 bài nhưng ở 3 tông khác nhau để luyện khả năng nhận biết màu sắc hòa thanh.' },
  { order: 4, title: 'Tập từng đoạn 2–3 bậc rồi ghép lại', description: 'Chia nhỏ: (i - iv), (VII - III), (VI - ii° - V7 - i). Luyện từng đoạn trước khi chơi toàn bộ vòng.' },
]

export function getVariations(keyId: string, level: 'beginner' | 'intermediate' | 'advanced'): string[] {
  const id = keyId.replace(/_custom$/, '')
  const mode = id.endsWith('m') ? 'minor' : 'major'
  const root = mode === 'minor' ? id.slice(0, -1) : id
  const key = computeKeyFromRoot(root, mode)
  const [tonic, subdominant, seventh, third, sixth, second, dominant] = key.chords
  if (level === 'beginner') return [
    `Tập chậm từng cặp: ${tonic} – ${subdominant}, ${seventh} – ${third}, ${sixth} – ${second}.`,
    `Luyện kết vòng: ${second} – ${dominant} – ${tonic}; giữ nhịp đều khi đổi hợp âm.`,
  ]
  if (level === 'intermediate') return [
    `Chơi toàn bộ vòng: ${key.chords.join(' – ')} – ${tonic}.`,
    `Luyện vòng ngắn ${mode === 'minor' ? 'iiø7 – V7 – i' : 'ii – V7 – I'}: ${second} – ${dominant} – ${tonic}.`,
  ]
  return [
    `Thêm hợp âm bảy: ${tonic}${mode === 'minor' ? '7' : 'maj7'}, ${subdominant}${mode === 'minor' ? '7' : 'maj7'}; giữ ${dominant} để giải quyết về ${tonic}.`,
    `Tập đảo thế và giữ các nốt chung trong ${second} – ${dominant} – ${tonic} để chuyển hợp âm mượt hơn.`,
  ]
}
