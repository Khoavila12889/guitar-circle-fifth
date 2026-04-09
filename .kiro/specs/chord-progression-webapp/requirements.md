# Tài Liệu Yêu Cầu: Chord Progression Webapp

## Giới Thiệu

Chord Progression Analyzer là một webapp âm nhạc client-side cho phép nhạc sĩ khám phá và luyện tập vòng hòa thanh 7 bậc. Phiên bản này mở rộng với 3 tính năng lớn: (1) Chế Độ Trưởng (Major Mode) với vòng `I - IV - vii° - iii - vi - ii - V7`, (2) hỗ trợ đầy đủ 12 tông chromatic cho cả minor và major với đánh dấu tông phổ biến nhạc Việt Nam, và (3) Custom Key Builder cho phép người dùng tự tính toán vòng hòa thanh từ bất kỳ tông nào. Toàn bộ dữ liệu là tĩnh, không cần backend hay API bên ngoài.

---

## Bảng Thuật Ngữ

- **App**: Ứng dụng Chord Progression Analyzer
- **KeySelector**: Component cho phép người dùng chọn tông âm nhạc
- **ModeToggle**: Component cho phép người dùng chuyển đổi giữa Minor Mode và Major Mode
- **ChordProgressionDisplay**: Component hiển thị 7 hợp âm trong vòng progression
- **VariationPanel**: Component hiển thị các biến thể theo cấp độ kỹ năng
- **PracticeGuide**: Component hướng dẫn luyện tập từng bước
- **MoodBadge**: Component hiển thị cảm xúc và màu sắc âm nhạc
- **CustomKeyBuilder**: Component cho phép người dùng nhập tông bất kỳ và tự động tính toán vòng hòa thanh
- **DataStore**: Module dữ liệu tĩnh chứa toàn bộ thông tin hòa thanh
- **ChordCalculator**: Module tính toán hợp âm từ root note và mode
- **MusicalKey**: Cấu trúc dữ liệu đại diện cho một tông âm nhạc (bao gồm `mode` và `isVietnamesePopular`)
- **ScaleMode**: Chế độ điệu thức — một trong `"minor"` hoặc `"major"`
- **ChordProgression**: Cấu trúc dữ liệu đại diện cho vòng hòa thanh 7 bậc
- **ChordDetail**: Cấu trúc dữ liệu chi tiết của một hợp âm trong vòng
- **VariationSet**: Tập hợp các biến thể theo 3 cấp độ kỹ năng
- **SkillLevel**: Cấp độ kỹ năng — một trong `"beginner"`, `"intermediate"`, `"advanced"`
- **HarmonicFunction**: Chức năng hòa thanh — một trong `"tonic"`, `"subdominant"`, `"dominant"`
- **Degree**: Bậc hòa thanh — minor: `"i","iv","VII","III","VI","ii°","V7"` | major: `"I","IV","vii°","iii","vi","ii","V7"`
- **FORMULA_MINOR**: Công thức vòng thứ `["i","iv","VII","III","VI","ii°","V7"]`
- **FORMULA_MAJOR**: Công thức vòng trưởng `["I","IV","vii°","iii","vi","ii","V7"]`
- **MinorKeys**: Tập 12 tông thứ được hỗ trợ: `Em, Am, Dm, Gm, Cm, Fm, Bbm, D#m, G#m, Bm, F#m, C#m`
- **MajorKeys**: Tập 7 tông trưởng được hỗ trợ: `C, G, D, A, E, F, Bb`
- **VietnamesePopularKeys**: Tông phổ biến nhạc Việt — thứ: `Em, Am, Dm`; trưởng: `C, G, F`
- **ChromaticScale**: Thang âm 12 nốt `[C, C#, D, D#, E, F, F#, G, G#, A, A#, B]`

---

## Yêu Cầu

### Yêu Cầu 1: Chọn Tông Âm Nhạc

**User Story:** Là một nhạc sĩ, tôi muốn chọn tông âm nhạc từ danh sách các tông được hỗ trợ (theo mode hiện tại), để tôi có thể xem vòng hòa thanh phù hợp với nhạc cụ và bài nhạc của mình.

#### Tiêu Chí Chấp Nhận

1. THE KeySelector SHALL hiển thị các tông thuộc MinorKeys (khi ở Minor Mode) hoặc MajorKeys (khi ở Major Mode) dưới dạng các nút bấm.
2. WHEN người dùng chọn một tông hợp lệ, THE App SHALL cập nhật tông đang được chọn và hiển thị vòng hòa thanh tương ứng.
3. WHILE một tông đang được chọn, THE KeySelector SHALL highlight tông đó để phân biệt với các tông còn lại.
4. IF người dùng cung cấp một tông không thuộc tập tông hợp lệ của mode hiện tại, THEN THE App SHALL hiển thị thông báo lỗi "Tông không được hỗ trợ" và tự động chọn lại tông mặc định (`"Em"` cho minor, `"C"` cho major).

---

### Yêu Cầu 2: Hiển Thị Vòng Hòa Thanh 7 Bậc

**User Story:** Là một nhạc sĩ, tôi muốn xem đầy đủ 7 hợp âm trong vòng hòa thanh theo đúng thứ tự công thức, để tôi hiểu được cấu trúc và logic hòa thanh của vòng.

#### Tiêu Chí Chấp Nhận

1. WHEN một tông hợp lệ được chọn, THE ChordProgressionDisplay SHALL render đúng 7 card hợp âm theo thứ tự Formula `i - iv - VII - III - VI - ii° - V7`.
2. THE ChordProgressionDisplay SHALL hiển thị tên hợp âm (name), bậc (degree), và vai trò hòa thanh (role) cho mỗi card.
3. THE ChordProgressionDisplay SHALL highlight màu sắc mỗi card theo HarmonicFunction: tonic (xanh lam), subdominant (xanh lá), dominant (đỏ/cam).
4. WHEN tông được thay đổi, THE ChordProgressionDisplay SHALL cập nhật toàn bộ 7 card với dữ liệu của tông mới.

---

### Yêu Cầu 3: Tra Cứu Dữ Liệu Hòa Thanh

**User Story:** Là một nhạc sĩ, tôi muốn hệ thống cung cấp dữ liệu hòa thanh chính xác cho từng tông và mode, để tôi có thể tin tưởng vào thông tin được hiển thị.

#### Tiêu Chí Chấp Nhận

1. WHEN `getProgressionByKey` được gọi với một `keyId` và `mode` hợp lệ, THE DataStore SHALL trả về một `ChordProgression` có đúng 7 `ChordDetail`.
2. THE DataStore SHALL đảm bảo `chordDetails[i].degree` bằng `FORMULA_MINOR[i]` (minor) hoặc `FORMULA_MAJOR[i]` (major) với mọi `i` từ 0 đến 6.
3. THE DataStore SHALL đảm bảo `chordDetails[i].name` khớp với hợp âm tương ứng trong dữ liệu tĩnh của tông đó.
4. IF `getProgressionByKey` được gọi với `keyId` không thuộc tập tông hợp lệ của `mode`, THEN THE DataStore SHALL ném lỗi với thông điệp `"Key không được hỗ trợ"`.
5. WHEN `mapDegreeToFunction` được gọi với một Degree hợp lệ và `mode` hợp lệ, THE DataStore SHALL trả về HarmonicFunction đúng theo bảng ánh xạ tương ứng với mode.

---

### Yêu Cầu 4: Hiển Thị Biến Thể Theo Cấp Độ Kỹ Năng

**User Story:** Là một nhạc sĩ, tôi muốn xem các gợi ý biến thể phù hợp với cấp độ kỹ năng của mình, để tôi có thể học và thực hành theo lộ trình phù hợp.

#### Tiêu Chí Chấp Nhận

1. THE VariationPanel SHALL hiển thị 3 tab tương ứng với 3 SkillLevel: Beginner, Intermediate, Advanced.
2. WHEN người dùng chọn một tab SkillLevel, THE VariationPanel SHALL hiển thị danh sách gợi ý tương ứng với cấp độ đó.
3. WHEN `getVariations` được gọi với `keyId` hợp lệ và `level = "beginner"`, THE DataStore SHALL trả về mảng có đúng 2 gợi ý.
4. WHEN `getVariations` được gọi với `keyId` hợp lệ và `level = "intermediate"`, THE DataStore SHALL trả về mảng có đúng 2 gợi ý.
5. WHEN `getVariations` được gọi với `keyId` hợp lệ và `level = "advanced"`, THE DataStore SHALL trả về mảng có đúng 3 gợi ý.
6. IF `getVariations` được gọi với `level` không hợp lệ, THEN THE DataStore SHALL fallback về dữ liệu của cấp độ `"beginner"`.
7. THE VariationPanel SHALL hiển thị giải thích ngắn gọn lý do âm nhạc cho mỗi gợi ý biến thể.

---

### Yêu Cầu 5: Hướng Dẫn Luyện Tập

**User Story:** Là một người học nhạc, tôi muốn có hướng dẫn luyện tập từng bước rõ ràng, để tôi biết cách tiếp cận và thực hành vòng hòa thanh một cách có hệ thống.

#### Tiêu Chí Chấp Nhận

1. THE PracticeGuide SHALL hiển thị đúng 4 bước luyện tập theo thứ tự từ 1 đến 4.
2. THE PracticeGuide SHALL hiển thị tiêu đề (title) và mô tả (description) cho mỗi bước.
3. WHEN người dùng nhấn vào một bước, THE PracticeGuide SHALL mở rộng hoặc thu gọn nội dung chi tiết của bước đó.

---

### Yêu Cầu 6: Hiển Thị Cảm Xúc Âm Nhạc

**User Story:** Là một nhạc sĩ, tôi muốn thấy thông tin về màu sắc cảm xúc của vòng hòa thanh, để tôi hiểu được tính chất âm nhạc và ứng dụng phù hợp trong sáng tác.

#### Tiêu Chí Chấp Nhận

1. THE MoodBadge SHALL hiển thị chuỗi `mood` mô tả cảm xúc của vòng hòa thanh.
2. THE MoodBadge SHALL hiển thị tất cả các `tags` mô tả màu sắc âm nhạc.

---

### Yêu Cầu 7: Tính Toàn Vẹn Dữ Liệu Tĩnh

**User Story:** Là một nhà phát triển, tôi muốn dữ liệu hòa thanh tĩnh luôn nhất quán và hợp lệ, để ứng dụng hoạt động đúng mà không cần kiểm tra runtime tốn kém.

#### Tiêu Chí Chấp Nhận

1. THE DataStore SHALL đảm bảo mỗi `MusicalKey` trong MinorKeys và MajorKeys có đúng 7 phần tử trong mảng `chords`.
2. THE DataStore SHALL đảm bảo mỗi `MusicalKey` có `mode` khớp với danh sách chứa nó (`"minor"` cho MinorKeys, `"major"` cho MajorKeys).
3. THE DataStore SHALL đảm bảo mỗi `VariationSet` tồn tại cho tất cả các tông trong MinorKeys.
4. THE DataStore SHALL đảm bảo `PRACTICE_STEPS` có đúng 4 phần tử với `order` từ 1 đến 4 theo thứ tự tăng dần.

---

### Yêu Cầu 8: Chế Độ Trưởng (Major Mode)

**User Story:** Là một nhạc sĩ, tôi muốn chuyển đổi giữa Minor Mode và Major Mode, để tôi có thể khám phá vòng hòa thanh trưởng với cảm xúc vui, phấn khởi bên cạnh vòng thứ.

#### Tiêu Chí Chấp Nhận

1. THE ModeToggle SHALL hiển thị 2 trạng thái rõ ràng: "Minor" và "Major".
2. WHEN người dùng chọn Major Mode, THE App SHALL hiển thị vòng hòa thanh theo FORMULA_MAJOR `I - IV - vii° - iii - vi - ii - V7`.
3. WHEN người dùng chọn Major Mode, THE App SHALL áp dụng bảng màu sáng/vàng/cam cho giao diện.
4. WHEN người dùng chọn Minor Mode, THE App SHALL áp dụng bảng màu tối/xanh đậm cho giao diện.
5. WHEN mode thay đổi, THE App SHALL reset về tông mặc định của mode đó (`"Em"` cho minor, `"C"` cho major).
6. THE DataStore SHALL cung cấp dữ liệu cho 7 tông trưởng trong MajorKeys với công thức `I - IV - vii° - iii - vi - ii - V7`.

---

### Yêu Cầu 9: Mở Rộng Tông — 12 Tông Đầy Đủ

**User Story:** Là một nhạc sĩ, tôi muốn truy cập đầy đủ 12 tông chromatic cho cả minor và major, để tôi không bị giới hạn bởi 7 tông cố định và có thể làm việc với bất kỳ tông nào.

#### Tiêu Chí Chấp Nhận

1. THE DataStore SHALL cung cấp dữ liệu cho đủ 12 tông thứ trong MinorKeys: `Em, Am, Dm, Gm, Cm, Fm, Bbm, D#m, G#m, Bm, F#m, C#m`.
2. THE DataStore SHALL cung cấp dữ liệu cho 7 tông trưởng phổ biến trong MajorKeys: `C, G, D, A, E, F, Bb`.
3. THE KeySelector SHALL hiển thị tất cả các tông của mode hiện tại.
4. WHEN người dùng chọn bất kỳ tông nào trong danh sách, THE App SHALL hiển thị đúng vòng hòa thanh tương ứng.

---

### Yêu Cầu 10: Tông Phổ Biến Nhạc Việt Nam

**User Story:** Là một nhạc sĩ Việt Nam, tôi muốn biết tông nào phổ biến trong nhạc Việt, để tôi có thể ưu tiên học và thực hành các tông phù hợp với tầm giọng và nhạc cụ phổ biến.

#### Tiêu Chí Chấp Nhận

1. THE KeySelector SHALL hiển thị badge "🇻🇳 Nhạc Việt" cho các tông thuộc VietnamesePopularKeys: thứ (`Em, Am, Dm`) và trưởng (`C, G, F`).
2. THE DataStore SHALL đánh dấu `isVietnamesePopular: true` cho đúng 6 tông: `Em, Am, Dm` (minor) và `C, G, F` (major).
3. WHILE hiển thị danh sách tông, THE KeySelector SHALL phân biệt trực quan các tông VietnamesePopularKeys với các tông còn lại.

---

### Yêu Cầu 11: Tự Tạo Tông Theo Công Thức (Custom Key Builder)

**User Story:** Là một nhạc sĩ nâng cao, tôi muốn nhập bất kỳ tông nào và để hệ thống tự tính toán vòng hòa thanh, để tôi không bị giới hạn bởi danh sách tông có sẵn.

#### Tiêu Chí Chấp Nhận

1. THE CustomKeyBuilder SHALL hiển thị input field để nhập root note và lựa chọn mode (minor/major).
2. WHEN người dùng nhập root note hợp lệ và chọn mode, THE CustomKeyBuilder SHALL gọi `computeChordsFromRoot` và hiển thị kết quả vòng hòa thanh.
3. THE `computeChordsFromRoot` function SHALL trả về mảng đúng 7 hợp âm theo công thức tương ứng với mode.
4. IF người dùng nhập root note không thuộc ChromaticScale (và enharmonic equivalents), THEN THE CustomKeyBuilder SHALL hiển thị thông báo lỗi inline và không cập nhật progression.
5. WHEN `computeChordsFromRoot` tạo ra tông tùy chỉnh thành công, THE App SHALL hiển thị vòng hòa thanh tương tự như khi chọn tông từ danh sách có sẵn.
