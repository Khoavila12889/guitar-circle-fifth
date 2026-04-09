import type { MusicalKey } from '../types'

export const FORMULA_MINOR: string[] = ['i', 'iv', 'VII', 'III', 'VI', 'ii°', 'V7']
export const FORMULA_MAJOR: string[] = ['I', 'IV', 'vii°', 'iii', 'vi', 'ii', 'V7']

// 12 minor keys (chromatic) — công thức i-iv-VII-III-VI-ii°-V7
export const MINOR_KEYS: MusicalKey[] = [
  { id: 'Em',  label: 'Em (Mi thứ)',           mode: 'minor', chords: ['Em',  'Am',  'D',  'G',  'C',  'F#m7b5', 'B7'],  isVietnamesePopular: true },
  { id: 'Am',  label: 'Am (La thứ)',           mode: 'minor', chords: ['Am',  'Dm',  'G',  'C',  'F',  'Bm7b5',  'E7'],  isVietnamesePopular: true },
  { id: 'Dm',  label: 'Dm (Rê thứ)',           mode: 'minor', chords: ['Dm',  'Gm',  'C',  'F',  'Bb', 'Em7b5',  'A7'],  isVietnamesePopular: true },
  { id: 'Gm',  label: 'Gm (Son thứ)',          mode: 'minor', chords: ['Gm',  'Cm',  'F',  'Bb', 'Eb', 'Am7b5',  'D7']  },
  { id: 'Cm',  label: 'Cm (Đô thứ)',           mode: 'minor', chords: ['Cm',  'Fm',  'Bb', 'Eb', 'Ab', 'Dm7b5',  'G7']  },
  { id: 'Fm',  label: 'Fm (Fa thứ)',           mode: 'minor', chords: ['Fm',  'Bbm', 'Ab', 'Db', 'Gb', 'Bm7b5',  'C7']  },
  { id: 'Bbm', label: 'Bbm (Si giáng thứ)',    mode: 'minor', chords: ['Bbm', 'Ebm', 'Ab', 'Db', 'Gb', 'Em7b5',  'F7']  },
  { id: 'D#m', label: 'D#m (Rê thăng thứ)',    mode: 'minor', chords: ['D#m', 'G#m', 'C#', 'F#', 'B',  'E#m7b5', 'A#7'] },
  { id: 'G#m', label: 'G#m (Sol thăng thứ)',   mode: 'minor', chords: ['G#m', 'C#m', 'F#', 'B',  'E',  'A#m7b5', 'D#7'] },
  { id: 'Bm',  label: 'Bm (Si thứ)',           mode: 'minor', chords: ['Bm',  'Em',  'A',  'D',  'G',  'C#m7b5', 'F#7'] },
  { id: 'F#m', label: 'F#m (Fa thăng thứ)',    mode: 'minor', chords: ['F#m', 'Bm',  'E',  'A',  'D',  'G#m7b5', 'C#7'] },
  { id: 'C#m', label: 'C#m (Đô thăng thứ)',    mode: 'minor', chords: ['C#m', 'F#m', 'B',  'E',  'A',  'D#m7b5', 'G#7'] },
]

// 7 major keys — công thức I-IV-vii°-iii-vi-ii-V7
export const MAJOR_KEYS: MusicalKey[] = [
  { id: 'C',  label: 'C (Đô trưởng)',          mode: 'major', chords: ['C',  'F',  'Bdim',  'Em', 'Am', 'Dm', 'G7'],  isVietnamesePopular: true },
  { id: 'G',  label: 'G (Sol trưởng)',          mode: 'major', chords: ['G',  'C',  'F#dim', 'Bm', 'Em', 'Am', 'D7'],  isVietnamesePopular: true },
  { id: 'D',  label: 'D (Rê trưởng)',           mode: 'major', chords: ['D',  'G',  'C#dim', 'F#m','Bm', 'Em', 'A7']  },
  { id: 'A',  label: 'A (La trưởng)',           mode: 'major', chords: ['A',  'D',  'G#dim', 'C#m','F#m','Bm', 'E7']  },
  { id: 'E',  label: 'E (Mi trưởng)',           mode: 'major', chords: ['E',  'A',  'D#dim', 'G#m','C#m','F#m','B7']  },
  { id: 'F',  label: 'F (Fa trưởng)',           mode: 'major', chords: ['F',  'Bb', 'Edim',  'Am', 'Dm', 'Gm', 'C7'],  isVietnamesePopular: true },
  { id: 'Bb', label: 'Bb (Si giáng trưởng)',    mode: 'major', chords: ['Bb', 'Eb', 'Adim',  'Dm', 'Gm', 'Cm', 'F7']  },
]

export const ROLE_DESCRIPTIONS_MINOR: Record<string, string> = {
  'i':   "Tonic thứ — Thiết lập màu sắc tối, buồn, là 'nhà'",
  'iv':  'Subdominant thứ — Củng cố màu thứ, tạo cảm giác nặng nề, kéo xuống',
  'VII': 'Subtonic trưởng — Chuyển sang màu sáng hơn, mở ra không gian',
  'III': 'Mediant trưởng — Tiếp tục sáng, tạo chiều sâu và kịch tính',
  'VI':  'Submediant trưởng — Cầu nối hạ nhiệt, cảm xúc lắng xuống',
  'ii°': 'Supertonic giảm — Tạo tension tột độ, các nốt hút kéo về bậc 1',
  'V7':  'Dominant 7 — Giải quyết (resolution) hoàn hảo, kéo mạnh về i',
}

export const ROLE_DESCRIPTIONS_MAJOR: Record<string, string> = {
  'I':    "Tonic trưởng — Thiết lập màu sắc sáng, vui, là 'nhà'",
  'IV':   'Subdominant trưởng — Mở rộng không gian, tạo cảm giác phấn khởi',
  'vii°': 'Leading tone giảm — Tạo tension mạnh, kéo về bậc I',
  'iii':  'Mediant thứ — Thêm chiều sâu, màu sắc trung gian',
  'vi':   'Submediant thứ — Cầu nối cảm xúc, tạo tương phản nhẹ',
  'ii':   'Supertonic thứ — Chuẩn bị cho dominant',
  'V7':   'Dominant 7 — Giải quyết hoàn hảo về I',
}
