# Kế Hoạch Triển Khai: Chord Progression Webapp (v3.0.0)

## Tổng Quan

Mở rộng webapp với 3 tính năng lớn: Major Mode, 12 tông đầy đủ, và Custom Key Builder. Tích hợp Circle of Fifths SVG làm UI chọn tông chính. Stack: React + TypeScript + Tailwind CSS + Vitest + fast-check.

## Tasks

- [x] 1. Cập nhật kiểu dữ liệu và hằng số nền tảng
  - Thêm `ScaleMode = "minor" | "major"` vào `src/types/index.ts`
  - Cập nhật interface `MusicalKey`: thêm trường `mode: ScaleMode` và `isVietnamesePopular?: boolean`
  - Cập nhật `ChordProgression.formula` để hỗ trợ cả 2 công thức
  - Cập nhật `mapDegreeToFunction` nhận thêm tham số `mode: ScaleMode`
  - _Yêu Cầu: 8.1, 9.1, 11.1_

- [x] 2. Mở rộng dữ liệu tĩnh — 12 tông thứ và 7 tông trưởng
  - [x] 2.1 Thêm `FORMULA_MINOR` và `FORMULA_MAJOR` vào `src/data/keys.ts`
    - Đổi tên `FORMULA` thành `FORMULA_MINOR`
    - Thêm `FORMULA_MAJOR = ["I","IV","vii°","iii","vi","ii","V7"]`
    - _Yêu Cầu: 8.2, 3.2_

  - [x] 2.2 Thêm 5 tông thứ còn thiếu vào `MINOR_KEYS`
    - Thêm: `Fm, Bbm, D#m, G#m, F#m` với dữ liệu chords đầy đủ
    - Đánh dấu `isVietnamesePopular: true` cho `Em, Am, Dm`
    - _Yêu Cầu: 9.1, 10.2_

  - [x] 2.3 Tạo `MAJOR_KEYS` với 7 tông trưởng
    - Thêm: `C, G, D, A, E, F, Bb` với dữ liệu chords theo FORMULA_MAJOR
    - Đánh dấu `isVietnamesePopular: true` cho `C, G, F`
    - _Yêu Cầu: 8.6, 9.2, 10.2_

  - [x] 2.4 Thêm `ROLE_DESCRIPTIONS_MAJOR` và cập nhật `ROLE_DESCRIPTIONS_MINOR`
    - Tách `ROLE_DESCRIPTIONS` thành `ROLE_DESCRIPTIONS_MINOR` và `ROLE_DESCRIPTIONS_MAJOR`
    - _Yêu Cầu: 8.2_

  - [ ]* 2.5 Viết property test kiểm tra tính toàn vẹn dữ liệu tĩnh
    - **Property 9: Tính toàn vẹn dữ liệu tĩnh của MusicalKey**
    - **Validates: Yêu Cầu 7.1, 7.2, 9.1**

- [x] 3. Triển khai `computeChordsFromRoot` (Custom Key Builder logic)
  - [x] 3.1 Tạo `src/utils/chordCalculator.ts` với hàm `computeChordsFromRoot`
    - Định nghĩa `CHROMATIC_SCALE`, `MINOR_INTERVALS`, `MAJOR_INTERVALS`
    - Triển khai thuật toán xây dựng scale 7 nốt từ root + intervals
    - Xây dựng chord quality theo bậc (minor/major/diminished/dominant7)
    - Ném `Error("Root note không hợp lệ")` nếu root không hợp lệ
    - _Yêu Cầu: 11.2, 11.3, 11.4_

  - [ ]* 3.2 Viết property test cho `computeChordsFromRoot`
    - **Property 10: computeChordsFromRoot trả về đúng 7 hợp âm**
    - **Validates: Yêu Cầu 11.2, 11.3**

  - [ ]* 3.3 Viết property test cho root không hợp lệ
    - **Property 11: computeChordsFromRoot với root không hợp lệ luôn ném lỗi**
    - **Validates: Yêu Cầu 11.4**

- [x] 4. Checkpoint — Kiểm tra logic dữ liệu
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

- [x] 5. Cập nhật `getProgressionByKey` hỗ trợ mode
  - [x] 5.1 Cập nhật hàm `getProgressionByKey(keyId, mode)` trong `src/data/store.ts`
    - Nhận thêm tham số `mode: ScaleMode`
    - Tra cứu từ `MINOR_KEYS` hoặc `MAJOR_KEYS` tùy theo mode
    - Dùng `FORMULA_MINOR` hoặc `FORMULA_MAJOR` tương ứng
    - Dùng `ROLE_DESCRIPTIONS_MINOR` hoặc `ROLE_DESCRIPTIONS_MAJOR` tương ứng
    - _Yêu Cầu: 3.1, 3.2, 8.2_

  - [ ]* 5.2 Viết property test cho progression minor
    - **Property 1: Progression luôn có đúng 7 hợp âm (minor)**
    - **Property 2: Thứ tự bậc minor là bất biến**
    - **Validates: Yêu Cầu 2.1, 3.1, 3.2**

  - [ ]* 5.3 Viết property test cho progression major
    - **Property 3: Thứ tự bậc major là bất biến**
    - **Validates: Yêu Cầu 8.1, 8.2**

  - [ ]* 5.4 Viết property test cho tông không hợp lệ
    - **Property 5: Tông không hợp lệ luôn ném lỗi**
    - **Validates: Yêu Cầu 1.4, 3.4**

  - [ ]* 5.5 Viết property test cho ChordDetail đầy đủ trường
    - **Property 4: Mọi ChordDetail đều có đủ 4 trường hợp lệ**
    - **Validates: Yêu Cầu 2.2, 3.3**

- [x] 6. Triển khai component `ModeToggle`
  - Tạo `src/components/ModeToggle.tsx`
  - Hiển thị toggle 2 trạng thái: "Minor" (tối/xanh đậm) và "Major" (sáng/vàng/cam)
  - Gọi `onModeChange` callback khi người dùng chuyển mode
  - _Yêu Cầu: 8.1, 8.3, 8.4_

- [x] 7. Triển khai component `CircleOfFifths` (SVG tương tác)
  - [x] 7.1 Tạo `src/components/CircleOfFifths.tsx`
    - Vẽ vòng tròn SVG thuần túy, không dùng thư viện ngoài
    - Vòng ngoài: 12 tông trưởng (Major) — bố cục theo thứ tự ngũ sắc (C, G, D, A, E, B, F#, Db, Ab, Eb, Bb, F)
    - Vòng trong: 12 tông thứ tương đối (relative minor) tương ứng (Am, Em, Bm, F#m, C#m, G#m, D#m, Bbm, Fm, Cm, Gm, Dm)
    - Mỗi ô là một `<path>` hình quạt, click để chọn tông
    - Tông đang chọn được highlight (fill màu nổi bật)
    - Tông phổ biến nhạc Việt có dấu chấm nhỏ hoặc viền khác biệt
    - _Yêu Cầu: 1.1, 1.2, 1.3, 9.3, 10.1, 10.3_

  - [x] 7.2 Tính toán tọa độ SVG cho các ô hình quạt
    - Dùng công thức `arc path` chuẩn: `M cx cy L x1 y1 A r r 0 0 1 x2 y2 Z`
    - Mỗi ô chiếm 30° (360° / 12 tông)
    - Vòng ngoài (major): bán kính ngoài 160px, trong 100px
    - Vòng trong (minor): bán kính ngoài 95px, trong 50px
    - Tâm vòng tròn ở giữa SVG viewBox

  - [x] 7.3 Kết nối `CircleOfFifths` với `App` state
    - Props: `selectedKey: string`, `currentMode: ScaleMode`, `onKeySelect: (keyId: string, mode: ScaleMode) => void`
    - Click vào ô major → gọi `onKeySelect(keyId, "major")`
    - Click vào ô minor → gọi `onKeySelect(keyId, "minor")`
    - Tự động sync highlight khi `selectedKey` hoặc `currentMode` thay đổi từ bên ngoài

- [x] 8. Cập nhật `KeySelector` hỗ trợ badge Nhạc Việt (fallback list)
  - Cập nhật `src/components/KeySelector.tsx` — giữ lại như danh sách dự phòng hoặc bỏ nếu Circle of Fifths đủ dùng
  - Hiển thị badge "🇻🇳 Nhạc Việt" cho các tông có `isVietnamesePopular: true`
  - Nhận `keys: MusicalKey[]` động (không hardcode 7 tông)
  - _Yêu Cầu: 1.1, 9.3, 10.1, 10.3_

- [x] 9. Triển khai component `CustomKeyBuilder`
  - [x] 9.1 Tạo `src/components/CustomKeyBuilder.tsx`
    - Input field cho root note (vd: "F#", "Bb")
    - Radio/toggle chọn mode (minor/major)
    - Nút "Tạo vòng hòa thanh" gọi `computeChordsFromRoot`
    - Hiển thị lỗi inline nếu root không hợp lệ
    - Gọi `onKeyGenerated` callback với `MusicalKey` kết quả
    - _Yêu Cầu: 11.1, 11.2, 11.4, 11.5_

  - [ ]* 9.2 Viết unit test cho `CustomKeyBuilder`
    - Test với root hợp lệ (vd: "F#" minor, "Bb" major)
    - Test hiển thị lỗi với root không hợp lệ
    - _Yêu Cầu: 11.4_

- [x] 10. Cập nhật `App` component — kết nối tất cả tính năng mới
  - Thêm state `currentMode: ScaleMode` (mặc định `"minor"`)
  - Tích hợp `ModeToggle` vào layout
  - Tích hợp `CircleOfFifths` làm UI chọn tông chính (thay thế hoặc bổ sung `KeySelector`)
  - Khi mode thay đổi: reset `selectedKey` về mặc định của mode
  - Tích hợp `CustomKeyBuilder` vào layout
  - Khi `onKeyGenerated` được gọi: cập nhật progression hiển thị
  - Truyền `mode` vào `getProgressionByKey`
  - _Yêu Cầu: 8.1, 8.5, 11.5_

- [x] 11. Cập nhật `ChordProgressionDisplay` hỗ trợ major formula
  - Cập nhật `src/components/ChordProgressionDisplay.tsx`
  - Hiển thị đúng degree labels theo mode (vd: "I" thay vì "i" cho major)
  - _Yêu Cầu: 2.1, 8.2_

- [x] 12. Checkpoint cuối — Đảm bảo tất cả tests pass
  - Đảm bảo tất cả tests pass, hỏi người dùng nếu có thắc mắc.

## Ghi Chú

- Tasks đánh dấu `*` là tùy chọn, có thể bỏ qua để ra MVP nhanh hơn
- Mỗi task tham chiếu yêu cầu cụ thể để đảm bảo traceability
- Property tests dùng `fast-check`, unit tests dùng `Vitest`
- `computeChordsFromRoot` là pure function, ưu tiên test kỹ trước khi tích hợp UI
- `CircleOfFifths` dùng SVG thuần, không cần thư viện ngoài — đơn giản và nhẹ
