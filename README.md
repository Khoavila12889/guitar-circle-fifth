# Guitar Circle of Fifths

Ứng dụng học vòng hòa thanh guitar và luyện chơi cùng nhạc nền.

Web: https://khoavila12889.github.io/guitar-circle-fifth/

## Chức năng cần giữ

- Vòng tròn quãng năm: chọn tông Major/Minor, chuyển chế độ và cập nhật vòng hợp âm.
- Tự tạo tông, bao gồm dấu thăng/giáng; hiển thị bậc, tên và vai trò hợp âm.
- Thế bấm Guitar: đủ các hợp âm trong mọi tông có sẵn và tông tự tạo, kể cả tên thăng/giáng đồng âm. Xem toàn bộ vòng với hai cột trên mobile, chạm từng hợp âm để phóng to; hiển thị ngón tay, dây buông, dây không gảy, barre, tên dây và ngăn bắt đầu. Đây là chức năng cốt lõi của ứng dụng hướng dẫn, cần luôn to và rõ.
- **Thực chiến — Phát nhạc & Luyện tập**: mở panel, dán URL rồi bấm **Phát** hoặc Enter; xóa/đổi bài; vòng hợp âm luôn theo tông đang chọn.
  - YouTube: watch, youtu.be, embed, shorts; phát nhúng và chỉnh âm lượng nhạc nền riêng (0–100%).
  - SoundCloud: phát nhúng.
  - Zing MP3, Spotify, NhacCuaTui, Apple Music, Nhac.vn: mở tab mới và luyện nhịp trên trang này.
- **Metronome** dùng được cả khi chưa thêm nhạc: bắt đầu/dừng, phách hiện tại, âm nhấn, BPM 40–200 (mặc định 80), preset 60/70/80/90/100/120/140, âm lượng riêng.
- **TAP tempo**: lấy trung bình tối đa tám lần gõ; reset thủ công hoặc sau ba giây không gõ; cập nhật BPM cả khi đang chạy.
- Nhịp: **4/4, 3/4, 2/4, 6/8, 9/8, 12/8, 5/4, 7/8**. Giữ quy ước cũ: mỗi phách mẫu số 8 bằng nửa thời gian phách mẫu số 4 tại cùng BPM.
- Biến thể Beginner/Intermediate/Advanced và hướng dẫn luyện tập.

Âm thanh bắt đầu sau thao tác người dùng. YouTube/SoundCloud cần mạng và quyền phát nhúng của bài nhạc; nếu không phát được YouTube, có thể mở link ở tab mới.

## Phát triển và kiểm tra

Mã nguồn ứng dụng nằm ở `chord-progression-webapp/`.

```sh
cd chord-progression-webapp
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Khi sửa CSS/giao diện, giữ nguyên các chức năng trên. Kiểm tra trên bản production: chọn tông → xem thế bấm → thêm URL → phát/xóa → chạy/dừng metronome → đổi nhịp/BPM → TAP → đổi âm lượng.

## Deploy GitHub Pages

Push `main` kích hoạt `.github/workflows/deploy-pages.yml`: build ứng dụng, upload `chord-progression-webapp/dist`, deploy bằng GitHub Actions. Pages dùng nguồn **GitHub Actions**; Vite dùng base `/guitar-circle-fifth/`. Không deploy lại từ nhánh `gh-pages` cũ và không commit `dist`.

Sau deploy, kiểm tra workflow thành công và mở trang production; chỉ kiểm tra HTTP 200 chưa đủ để xác nhận các chức năng còn hoạt động.

## Lịch sử và lưu ý bảo toàn chức năng

Nhánh `gh-pages`, commit `0c27318` (09/04/2026), chứa bundle có Thực chiến, metronome, TAP và thế bấm guitar. Các chức năng đó **không có trong mã nguồn main ở `50fb4ea` / `762d752`**. Khi chuyển deploy sang main ở `892516d`, trang mất các chức năng đã có trên bản build cũ. Đã khôi phục chúng vào mã nguồn từ hành vi và dữ liệu của bundle `0c27318`, giữ cấu hình CSS production và deploy tự động.

Nếu đối chiếu lịch sử, xem cả mã nguồn **và bản đã deploy**, không mặc định main cũ là đầy đủ. `circle-of-fifths` là gitlink cũ không có `.gitmodules`, không phải thư mục build ứng dụng hiện tại.

Hướng dẫn cho agent: [AGENTS.md](AGENTS.md), skill [guitar-feature-preservation](.agents/skills/guitar-feature-preservation/SKILL.md).
