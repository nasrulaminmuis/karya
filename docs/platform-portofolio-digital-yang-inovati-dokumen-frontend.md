# Dokumen Frontend

## Tech Stack Frontend

### Frontend Framework
- **libraries**: react-query v5.28 (TanStack Query) - Untuk manajemen data fetching, caching, dan sinkronisasi, meningkatkan kinerja dan developer experience., next-auth v5.0 (Auth.js) - Untuk otentikasi user dengan dukungan berbagai penyedia (email, OAuth), menyederhanakan implementasi keamanan., uploadthing v6.4 - Untuk memudahkan dan mengamankan proses unggah media (gambar/video) proyek., recharts v2.12 - Untuk visualisasi data analitik portofolio (kunjungan, impresi) secara interaktif.
- **language**: TypeScript v5.4
- **ui_library**: Tailwind CSS v3.4
- **framework**: Next.js v14.2
- **state_management**: Zustand v4.5

## Struktur Halaman

### Beranda
- **Path**: `/`
- **Deskripsi**: Halaman utama platform yang menampilkan ringkasan, informasi umum, dan mungkin daftar developer unggulan atau terbaru untuk Calon Klien.
- **Komponen**: Header Navigasi, Banner Utama, Bagian Pengenalan Platform, Daftar Developer Unggulan (opsional), Footer

### Halaman Pendaftaran Akun
- **Path**: `/register`
- **Deskripsi**: Halaman untuk Programmer/Developer mendaftar akun baru dengan email dan kata sandi, yang juga memicu pengiriman email verifikasi (US-10, US-11).
- **Komponen**: Formulir Pendaftaran (Nama, Email, Kata Sandi), Tombol Daftar, Tautan 'Sudah punya akun?' (ke halaman Login), Tautan Kebijakan Privasi

### Halaman Verifikasi Email
- **Path**: `/verify-email/:token`
- **Deskripsi**: Halaman yang dikunjungi pengguna setelah mengklik tautan verifikasi di email untuk mengaktifkan akun (US-11).
- **Komponen**: Pesan Konfirmasi Verifikasi, Tombol Lanjutkan ke Login/Dashboard

### Halaman Login
- **Path**: `/login`
- **Deskripsi**: Halaman untuk Programmer/Developer masuk ke akun yang sudah terdaftar (US-10).
- **Komponen**: Formulir Login (Email, Kata Sandi), Tombol Login, Tautan 'Lupa Kata Sandi?', Tautan 'Belum punya akun?' (ke halaman Pendaftaran)

### Halaman Lupa Kata Sandi
- **Path**: `/forgot-password`
- **Deskripsi**: Halaman untuk pengguna meminta reset kata sandi jika lupa.
- **Komponen**: Formulir Input Email, Tombol Kirim Link Reset

### Halaman Atur Ulang Kata Sandi
- **Path**: `/reset-password/:token`
- **Deskripsi**: Halaman untuk pengguna mengatur kata sandi baru setelah menerima tautan reset melalui email.
- **Komponen**: Formulir Input Kata Sandi Baru, Tombol Simpan Kata Sandi Baru

### Dashboard Developer
- **Path**: `/dashboard`
- **Deskripsi**: Halaman utama bagi Programmer/Developer yang sudah masuk, menampilkan ringkasan portofolio, notifikasi, dan navigasi cepat ke fitur-fitur utama.
- **Komponen**: Header Dashboard, Ringkasan Statistik (jumlah proyek, kunjungan, dll.), Daftar Proyek Terbaru/Unggulan, Tautan Cepat (Tambah Proyek, Analitik, Pengaturan), Sidebar Navigasi

### Halaman Daftar Proyek
- **Path**: `/dashboard/projects`
- **Deskripsi**: Halaman yang menampilkan semua proyek dalam portofolio developer, dengan opsi untuk mengedit dan menghapus proyek (US-2, US-3).
- **Komponen**: Daftar Proyek (dengan kartu/tabel), Tombol 'Tambah Proyek Baru', Tombol 'Edit Proyek' (per proyek), Tombol 'Hapus Proyek' (per proyek), Modal Konfirmasi Penghapusan

### Halaman Tambah Proyek Baru
- **Path**: `/dashboard/projects/new`
- **Deskripsi**: Halaman formulir untuk Programmer/Developer menambahkan proyek baru ke portofolionya (US-1).
- **Komponen**: Formulir Proyek (Judul, Deskripsi, Teknologi, Tautan Demo, Tautan Repositori, Unggah Media), Tombol Simpan, Tombol Batal

### Halaman Edit Proyek
- **Path**: `/dashboard/projects/:id/edit`
- **Deskripsi**: Halaman formulir untuk Programmer/Developer mengedit detail proyek yang sudah ada di portofolionya (US-2).
- **Komponen**: Formulir Proyek (pre-filled dengan data proyek), Tombol Simpan Perubahan, Tombol Batal

### Halaman Pengaturan Akun
- **Path**: `/dashboard/settings`
- **Deskripsi**: Halaman pusat untuk mengelola berbagai pengaturan akun dan portofolio, berfungsi sebagai hub navigasi ke sub-halaman pengaturan.
- **Komponen**: Sidebar Navigasi Pengaturan, Konten Pengaturan Umum (Opsional)

### Halaman Pengaturan Keamanan
- **Path**: `/dashboard/settings/security`
- **Deskripsi**: Halaman untuk Programmer/Developer mengelola pengaturan keamanan akun, termasuk mengaktifkan atau menonaktifkan Otentikasi Multi-Faktor (MFA) (US-13).
- **Komponen**: Toggle MFA, Opsi Pemulihan Akun, Riwayat Aktivitas Login

### Halaman Pengaturan Profil
- **Path**: `/dashboard/settings/profile`
- **Deskripsi**: Halaman untuk Programmer/Developer mengelola informasi dasar profil, URL unik portofolio, dan tautan ke media sosial (US-8).
- **Komponen**: Formulir Informasi Dasar (Nama, Foto Profil, Bio), Input URL Portofolio Unik, Formulir Tautan Media Sosial, Tombol Simpan Perubahan

### Halaman Pengaturan Keahlian
- **Path**: `/dashboard/settings/skills`
- **Deskripsi**: Halaman untuk Programmer/Developer mencantumkan daftar keahlian dan teknologi yang dikuasai beserta level penguasaannya (US-6).
- **Komponen**: Formulir Tambah Keahlian (Nama Keahlian, Level Penguasaan), Daftar Keahlian, Tombol 'Edit Keahlian', Tombol 'Hapus Keahlian'

### Halaman Pengaturan Sertifikasi & Penghargaan
- **Path**: `/dashboard/settings/certificates`
- **Deskripsi**: Halaman untuk Programmer/Developer menambahkan, mengedit, atau menghapus sertifikat, kursus, atau penghargaan ke profilnya (US-9).
- **Komponen**: Formulir Tambah Sertifikasi/Penghargaan (Nama, Penerbit, Tanggal, Deskripsi), Daftar Sertifikasi/Penghargaan, Tombol 'Edit', Tombol 'Hapus'

### Halaman Pengaturan Tampilan Portofolio
- **Path**: `/dashboard/settings/appearance`
- **Deskripsi**: Halaman untuk Programmer/Developer memilih tema, tata letak, dan skema warna untuk personalisasi tampilan portofolionya (US-5).
- **Komponen**: Pemilih Tema, Opsi Tata Letak, Pemilih Warna, Pratinjau Tampilan Portofolio

### Halaman Pengaturan Integrasi
- **Path**: `/dashboard/settings/integrations`
- **Deskripsi**: Halaman untuk Programmer/Developer mengintegrasikan portofolio dengan repositori kode eksternal seperti GitHub, GitLab, atau Bitbucket (US-4).
- **Komponen**: Tombol Integrasi (GitHub, GitLab, Bitbucket), Status Integrasi yang sudah terhubung

### Halaman Analitik Portofolio
- **Path**: `/dashboard/analytics`
- **Deskripsi**: Halaman untuk Programmer/Developer melihat analitik portofolio seperti jumlah kunjungan, impresi proyek, dan interaksi pengunjung (US-7).
- **Komponen**: Grafik Kunjungan, Metrik Impresi Proyek, Grafik Interaksi Pengunjung, Filter Periode Waktu

### Halaman Cari Developer
- **Path**: `/developers`
- **Deskripsi**: Halaman untuk Calon Klien mencari developer berdasarkan berbagai kriteria (keahlian, teknologi, dll.).
- **Komponen**: Bilah Pencarian, Filter (Keahlian, Teknologi, Lokasi), Daftar Hasil Developer (kartu/profil ringkas)

### Halaman Profil Publik Developer
- **Path**: `/:username`
- **Deskripsi**: Halaman publik yang menampilkan portofolio lengkap seorang developer, termasuk keahlian, daftar proyek dengan demo interaktif, tautan repositori kode, dan sertifikasi (US-18, US-19, US-20, US-21).
- **Komponen**: Header Profil Publik (Nama, Foto, Bio, Kontak), Bagian 'Tentang Saya', Bagian 'Keahlian' (US-19), Daftar Proyek (dengan deskripsi, gambar/video, tautan demo/repositori interaktif) (US-18, US-20), Bagian 'Sertifikasi & Penghargaan' (US-21), Tautan Media Sosial, Formulir Kontak (opsional)

## Design System

Tentu, berikut adalah Panduan Sistem Desain yang komprehensif, modern, dan estetis untuk aplikasi portofolio developer Anda, dengan mempertimbangkan User Stories dan User Flow yang telah diberikan:

---

# **Panduan Sistem Desain Portofolio Developer**

## **Filosofi Desain**
Sistem desain ini bertujuan untuk menciptakan pengalaman pengguna yang **profesional, intuitif, cepat, dan modern**. Platform harus terasa **terpercaya** bagi developer untuk memamerkan karyanya dan **efisien** bagi calon klien untuk menemukan talenta. Kami mengutamakan **keterbacaan, aksesibilitas, dan konsistensi** di seluruh antarmuka.

---

## 1. Palet Warna

Palet warna dirancang untuk memberikan nuansa profesionalisme, kepercayaan, dan sentuhan modern.

| Kategori      | Warna                     | Kode HEX    | Keterangan                                       |
| :------------ | :------------------------ | :---------- | :----------------------------------------------- |
| **Primary**   | **Deep Sky Blue**         | `#2E83F6`   | Warna utama untuk elemen interaktif dan branding. |
| **Secondary** | **Teal Blue**             | `#00BFA5`   | Warna pelengkap untuk aksen atau elemen sekunder. |
| **Accent**    | **Vibrant Orange**        | `#FF9800`   | Warna penekanan untuk CTA atau highlight penting. |
| **Neutral**   | **White**                 | `#FFFFFF`   | Latar belakang utama (Light Mode).               |
|               | **Light Gray**            | `#F5F5F5`   | Latar belakang komponen ringan, divider.         |
|               | **Medium Gray**           | `#E0E0E0`   | Border, placeholder, ikon non-aktif.             |
|               | **Dark Gray**             | `#616161`   | Teks sekunder, label.                            |
|               | **Charcoal Black**        | `#212121`   | Teks utama, ikon aktif.                          |
| **Semantic**  | **Success (Green)**       | `#4CAF50`   | Indikasi berhasil/positif.                       |
|               | **Warning (Amber)**       | `#FFC107`   | Indikasi peringatan.                             |
|               | **Error (Red)**           | `#F44336`   | Indikasi error/negatif.                          |
|               | **Info (Light Blue)**     | `#2196F3`   | Indikasi informasi atau notifikasi.              |

**Warna Background:**
*   **Light Mode Background:** `#FFFFFF` (White)
*   **Dark Mode Background:** `#121212` (Dark Grey - base)
*   **Dark Mode Surface:** `#1E1E1E` (Slightly lighter dark grey for cards, modals)

---

## 2. Tipografi

Penggunaan font `Inter` dari Google Fonts untuk memastikan keterbacaan yang sangat baik di berbagai ukuran layar dan nuansa modern yang bersih.

**Font Family Utama:** `Inter`, sans-serif (Google Fonts)

**Skala Tipografi:**

| Skala            | Ukuran Font (px) | Line Height  | Font Weight       | Keterangan                                     |
| :--------------- | :--------------- | :----------- | :---------------- | :--------------------------------------------- |
| **Display**      | `60px`           | `1.1`        | `Bold (700)`      | Header halaman utama, tagline.                 |
| **H1**           | `48px`           | `1.2`        | `Semibold (600)`  | Judul halaman utama.                           |
| **H2**           | `36px`           | `1.3`        | `Semibold (600)`  | Judul bagian, sub-halaman.                     |
| **H3**           | `24px`           | `1.4`        | `Medium (500)`    | Judul komponen, card, modul.                   |
| **H4**           | `18px`           | `1.5`        | `Medium (500)`    | Sub-judul, nama dalam daftar.                  |
| **Body Large**   | `16px`           | `1.6`        | `Regular (400)`   | Paragraf utama, teks penting.                  |
| **Body**         | `14px`           | `1.6`        | `Regular (400)`   | Teks standar, deskripsi singkat.               |
| **Caption**      | `12px`           | `1.6`        | `Regular (400)`   | Metadata, label kecil, teks pembantu.          |

---

## 3. Sistem Spasi & Layout

Sistem berbasis grid 8pt digunakan untuk konsistensi dan skalabilitas.

*   **Base Unit Spasi:** `8px`
    *   Semua spasi internal (padding, margin) dan eksternal (jarak antar komponen) harus kelipatan dari `8px` (misal: `8px, 16px, 24px, 32px, 40px`, dst.).

*   **Breakpoints Responsif:**
    *   **Mobile:** `< 768px` (misal: 375px, 425px)
        *   Layout satu kolom, navigasi bottom sheet atau drawer.
        *   Padding konten horizontal `16px` atau `24px`.
    *   **Tablet:** `768px - 1024px`
        *   Layout dua atau tiga kolom adaptif.
        *   Navigasi tetap di samping atau top bar yang lebih ringkas.
        *   Padding konten horizontal `32px`.
    *   **Desktop:** `> 1024px`
        *   Layout multi-kolom, navigasi sidebar atau top bar penuh.
        *   Maksimal lebar konten `1280px` atau `1440px` untuk kenyamanan visual.
        *   Padding konten horizontal `48px` atau `64px`.

---

## 4. Komponen UI Utama

### **Style Button**

Semua tombol memiliki `border-radius: 8px` dan `font-weight: Semibold (600)`.

*   **Primary Button:**
    *   **Background:** `Primary (#2E83F6)`
    *   **Text:** `White (#FFFFFF)`
    *   **Padding:** `12px 24px`
    *   **Font Size:** `16px`
    *   **Hover:** Background sedikit lebih gelap (`#246AD1`), `box-shadow` ringan.
    *   **Active:** Background lebih gelap (`#1A53A6`), `scale(0.98)`.
*   **Secondary Button:**
    *   **Background:** `Light Gray (#F5F5F5)`
    *   **Text:** `Charcoal Black (#212121)`
    *   **Border:** `1px solid Medium Gray (#E0E0E0)`
    *   **Padding:** `12px 24px`
    *   **Font Size:** `16px`
    *   **Hover:** Background `Medium Gray (#E0E0E0)`.
    *   **Active:** Background `Dark Gray (#616161)`, text `White (#FFFFFF)`.
*   **Ghost Button:**
    *   **Background:** `transparent`
    *   **Text:** `Primary (#2E83F6)`
    *   **Padding:** `12px 24px`
    *   **Font Size:** `16px`
    *   **Hover:** Background `rgba(46, 131, 246, 0.1)` (Primary dengan opacity rendah).
    *   **Active:** Background `rgba(46, 131, 246, 0.2)`.
*   **Danger Button:**
    *   **Background:** `Error (#F44336)`
    *   **Text:** `White (#FFFFFF)`
    *   **Padding:** `12px 24px`
    *   **Font Size:** `16px`
    *   **Hover:** Background sedikit lebih gelap (`#D32F2F`).
    *   **Active:** Background lebih gelap (`#C62828`), `scale(0.98)`.

### **Card**

*   **Border-radius:** `12px`
*   **Shadow:** `0 4px 12px rgba(0, 0, 0, 0.08)` (Light Mode), `0 4px 12px rgba(0, 0, 0, 0.4)` (Dark Mode)
*   **Padding:** `24px` (internal content)
*   **Background:** `White (#FFFFFF)` (Light Mode), `Dark Mode Surface (#1E1E1E)` (Dark Mode)

### **Input Field**

*   **Normal State:**
    *   **Border:** `1px solid Medium Gray (#E0E0E0)`
    *   **Border-radius:** `8px`
    *   **Padding:** `12px 16px`
    *   **Background:** `White (#FFFFFF)` (Light Mode), `Dark Mode Surface (#1E1E1E)` (Dark Mode)
    *   **Text:** `Charcoal Black (#212121)` (Light Mode), `White (#FFFFFF)` (Dark Mode)
*   **Focus State:**
    *   **Border:** `2px solid Primary (#2E83F6)`
    *   `Outline: none` (untuk mencegah double outline)
*   **Error State:**
    *   **Border:** `2px solid Error (#F44336)`
    *   Disertai teks error di bawah input (Caption, warna Error).

### **Badge, Chip, Avatar**

*   **Badge:**
    *   Digunakan untuk label status atau kategori kecil.
    *   **Padding:** `4px 8px`
    *   **Border-radius:** `4px`
    *   **Background:** `rgba(46, 131, 246, 0.1)` (Primary dengan opacity 10%)
    *   **Text:** `Primary (#2E83F6)`
    *   **Font-size:** `12px` (Caption)
    *   **Font-weight:** `Medium (500)`
*   **Chip:**
    *   Digunakan untuk tag interaktif, pilihan filter, atau skill.
    *   **Padding:** `8px 12px`
    *   **Border-radius:** `20px` (bentuk pill)
    *   **Background:** `Medium Gray (#E0E0E0)` (Light Mode), `Dark Gray (#616161)` (Dark Mode)
    *   **Text:** `Dark Gray (#616161)` (Light Mode), `Light Gray (#F5F5F5)` (Dark Mode)
    *   **Font-size:** `14px` (Body)
    *   Opsional: Ikon "X" untuk dismissible.
*   **Avatar:**
    *   Digunakan untuk representasi pengguna atau inisial.
    *   **Bentuk:** Lingkaran sempurna (`border-radius: 50%`).
    *   **Ukuran Standar:**
        *   `Small: 32px` diameter (misal: di dalam tabel, list item)
        *   `Medium: 48px` diameter (misal: di header profil, komentar)
        *   `Large: 64px` diameter (misal: halaman profil utama)
    *   **Background Default:** `Primary (#2E83F6)`
    *   **Text Default:** `White (#FFFFFF)` (inisial), `Font-weight: Medium (500)`

---

## 5. Animasi & Transisi

Animasi dan transisi yang halus meningkatkan persepsi kecepatan dan kualitas aplikasi.

*   **Durasi Standar:**
    *   **Fast:** `100ms` (untuk feedback instan, hover, klik)
    *   **Normal:** `250ms` (untuk sebagian besar transisi UI, slide-in/out)
    *   **Slow:** `400ms` (untuk transisi halaman, perubahan layout kompleks)

*   **Easing Curve:**
    *   **`ease-in-out`:** Untuk transisi UI umum (perubahan ukuran, posisi, warna) agar terasa halus dari awal hingga akhir. Contoh: `cubic-bezier(0.4, 0, 0.2, 1)`
    *   **`ease-out`:** Untuk entri elemen baru ke dalam tampilan (muncul/geser masuk) agar terasa cepat di awal dan melambat di akhir. Contoh: `cubic-bezier(0, 0, 0.2, 1)`

*   **Page Transition:**
    *   **Effect:** Fade in (opacity) + Slide up (translateY) untuk konten baru.
    *   **Detail:** `opacity: 0` -> `1`, `transform: translateY(20px)` -> `0`.
    *   **Durasi:** `Slow (400ms)`.

*   **Loading States:**
    *   **Skeleton Screen Animation:**
        *   Efek shimmer (gradient bergerak) pada placeholder konten yang sedang dimuat.
        *   Digunakan untuk blok konten besar seperti daftar proyek, detail profil.
        *   Meningkatkan *perceived performance*.
    *   **Spinner:**
        *   Ikon berputar (misal: lingkaran atau ikon kustom).
        *   Digunakan untuk loading singkat atau aksi spesifik (misal: tombol submit).
        *   Warna: `Primary (#2E83F6)`.
    *   **Progress Bar:**
        *   Bar horizontal yang mengisi dari kiri ke kanan.
        *   Digunakan untuk proses yang memakan waktu lama (misal: unggah file, proses integrasi GitHub).
        *   Warna: `Primary (#2E83F6)`.

*   **Komponen Animasi:**
    *   **Accordion Expand/Collapse:**
        *   Transisi halus pada `max-height` atau `height` dan `opacity` dari konten.
        *   Ikon panah berputar (`rotate(0deg)` -> `rotate(180deg)`) untuk menunjukkan status buka/tutup.
        *   **Durasi:** `Normal (250ms)`, `ease-in-out`.
    *   **Modal Fade + Scale:**
        *   Overlay muncul dengan `opacity: 0` -> `1`.
        *   Modal itu sendiri muncul dengan `opacity: 0` -> `1` dan `transform: scale(0.95)` -> `1`.
        *   **Durasi:** `Normal (250ms)`, `ease-out`.
    *   **Dropdown Slide Down:**
        *   Muncul dari bawah elemen pemicu dengan `opacity: 0` -> `1` dan `transform: translateY(-10px)` -> `0`.
        *   **Durasi:** `Fast (100ms)`, `ease-out`.

---

## 6. Interaksi dengan Pengguna

Interaksi yang responsif dan umpan balik yang jelas adalah kunci untuk pengalaman pengguna yang baik.

*   **Hover Effect:**
    *   **Button:** `transform: scale(1.02)` (sedikit membesar) + `box-shadow` (elevasi bayangan).
    *   **Link (inline):** `text-decoration: underline` muncul atau berubah warna secara halus.
    *   **Card:** `box-shadow` meningkat (elevasi bayangan) + `transform: scale(1.005)` (sedikit membesar, sangat subtle).
    *   **Ikon:** Warna berubah menjadi `Primary` atau sedikit lebih gelap.

*   **Focus State:**
    *   **Elemen Interaktif (Button, Input, Link, Card yang dapat diklik):**
        *   `Outline` berbentuk cincin (ring) berwarna `Primary (#2E83F6)` dengan `offset 2px` di luar border.
        *   Ini sangat penting untuk **aksesibilitas** pengguna keyboard dan alat bantu.
        *   `outline-offset: 2px; outline: 2px solid #2E83F6;`

*   **Active/Press State:**
    *   **Button:** `transform: scale(0.98)` (sedikit menyusut) + background sedikit lebih gelap. Memberikan umpan balik fisik saat ditekan.
    *   **Card yang Dapat Diklik:** `box-shadow` kembali ke normal (depress) atau sedikit lebih rendah, `transform: scale(0.995)`.

*   **Micro-interactions:**
    *   **Form Validation Shake on Error:** Input field akan "bergetar" secara horizontal singkat saat submit gagal karena validasi (misal: password tidak cocok).
    *   **Success Checkmark Animation:** Saat sebuah aksi berhasil (misal: "Proyek ditambahkan"), tampilkan ikon centang yang beranimasi singkat, diikuti oleh Toast notification.
    *   **Copy Button Feedback:** Setelah menekan tombol "Salin", teks pada tombol berubah menjadi "Disalin!" selama 1-2 detik, atau muncul toast notification "Teks berhasil disalin!".
    *   **Toast Notification Slide-in:** Notifikasi singkat muncul dari sudut kanan bawah atau atas, meluncur masuk (`slide-in`) dan menghilang secara otomatis setelah beberapa detik.
    *   **Switch/Toggle:** Animasi halus pada handle dan track saat diubah statusnya.

*   **Scroll Behavior:**
    *   **Smooth Scroll:** Menggulir halaman ke anchor link secara halus dan beranimasi (scroll-behavior: smooth).
    *   **Parallax Ringan (opsional):** Jika ada hero section dengan gambar latar belakang, efek parallax yang sangat ringan bisa diterapkan pada gambar latar belakang saat menggulir untuk menambah kedalaman. Namun, ini harus digunakan dengan sangat hati-hati agar tidak mengganggu performa atau fokus utama.

*   **Feedback Visual:**
    *   **Ripple Effect pada Tombol Klik:** Efek riak (expanding circle) yang muncul dari titik klik pada tombol.
    *   **Skeleton Loading:** Digunakan secara konsisten sebelum data atau konten utama muncul, terutama pada daftar proyek, detail proyek, atau halaman profil. Ini memberikan indikasi bahwa konten sedang dimuat dan mengurangi *perceived wait time*.

---

## 7. Iconography & Imagery

*   **Icon Style:**
    *   **Filled Style:** Menggunakan ikon gaya *filled* untuk konsistensi, kejelasan visual pada ukuran kecil, dan tampilan yang modern/solid.
    *   **Sumber:** Disarankan menggunakan library ikon seperti `Material Icons (Filled)` atau `Font Awesome (Solid)` untuk kemudahan dan ketersediaan.
    *   **Warna Default:** `Charcoal Black (#212121)` (Light Mode), `White (#FFFFFF)` (Dark Mode), atau `Primary (#2E83F6)` untuk ikon interaktif.

*   **Ukuran Standar Icon:**
    *   **`16px` (small):** Digunakan dalam tabel, list item, badge, atau ikon pendamping teks kecil.
    *   **`20px` (normal):** Ukuran default untuk sebagian besar ikon UI, navigasi, dan tombol.
    *   **`24px` (large):** Digunakan untuk ikon di judul, hero section, atau ikon yang memerlukan penekanan lebih.

*   **Style Ilustrasi atau Foto:**
    *   **Ilustrasi:**
        *   **Gaya:** Minimalis, bersih, dengan bentuk-bentuk geometris yang sederhana.
        *   **Palet Warna:** Menggunakan palet warna sistem desain (Primary, Secondary, Accent, Neutral) untuk menjaga konsistensi.
        *   **Penggunaan:** Ideal untuk empty states, onboarding, hero section yang membutuhkan sentuhan personalisasi dan kehangatan. Hindari detail yang berlebihan.
    *   **Foto (Gambar Proyek Developer):**
        *   **Kualitas:** Harus selalu berkualitas tinggi, resolusi baik, dan relevan dengan proyek yang ditampilkan.
        *   **Authenticity:** Mendorong developer untuk menggunakan tangkapan layar, demo, atau video asli dari proyek mereka.
        *   **Konsistensi:** Tidak ada filter atau gaya paksaan pada gambar yang diunggah developer, namun platform akan memastikan *aspect ratio* yang konsisten di tampilan preview (misal: 16:9 atau 4:3 dengan cropping cerdas) dan proses *lazy loading* untuk performa.

---

Panduan Sistem Desain ini diharapkan memberikan fondasi yang kokoh untuk membangun antarmuka pengguna yang profesional, konsisten, dan menyenangkan bagi Programmer/Developer dan Calon Klien.