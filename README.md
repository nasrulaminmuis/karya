<div align="center">

# 🚀 Karya

**Aplikasi Manajemen Proyek Modern**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)

</div>

---

Karya adalah aplikasi berbasis web modern untuk memudahkan pengelolaan proyek dan tugas. Dibangun dengan fokus pada kinerja, skalabilitas, dan pengalaman pengguna yang optimal menggunakan teknologi web terbaru.

## 🌟 Fitur Utama

- **Autentikasi Aman**: Sistem login dan registrasi menggunakan JWT dan enkripsi password.
- **Dashboard Interaktif**: Visualisasi data proyek menggunakan Recharts.
- **Manajemen Proyek (CRUD)**: Buat, baca, perbarui, dan hapus proyek dengan mudah.
- **Manajemen State Global**: Menggunakan Zustand untuk performa aplikasi yang reaktif.
- **Desain Responsif**: Antarmuka modern dan responsif menggunakan Tailwind CSS 4.
- **Pengujian Komprehensif**: Dilengkapi dengan unit testing (Jest) dan E2E testing (Playwright).

## 🛠️ Teknologi yang Digunakan

**Frontend:**
- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (State Management)
- [Lucide React](https://lucide.dev/) (Icons)
- [Recharts](https://recharts.org/) (Charts)

**Backend & Database:**
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

**Testing & CI/CD:**
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) (Unit Test)
- [Playwright](https://playwright.dev/) (E2E Test)
- [GitHub Actions](https://github.com/features/actions)
- [Vercel](https://vercel.com/)

---

## 🚀 Memulai Proyek (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda.

### Prasyarat

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 20 atau lebih baru)
- [PostgreSQL](https://www.postgresql.org/) (berjalan secara lokal atau menggunakan layanan cloud seperti Aiven)
- `npm` atau `yarn`

### Instalasi

1. **Kloning repositori:**
   ```bash
   git clone <url-repositori-anda>
   cd karya
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Inisialisasi Environment Variables:**
   Buat file `.env` di direktori root aplikasi dan tambahkan variabel database Anda:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/karyadb"
   JWT_SECRET="kunci-rahasia-anda"
   ```

4. **Migrasi Database:**
   Deploy skema Prisma ke dalam database Anda:
   ```bash
   npx prisma db push
   # atau npx prisma migrate dev
   ```

5. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

---

## 🧪 Pengujian (Testing)

Proyek ini menggunakan dua jenis pengujian untuk memastikan kualitas kode.

**Menjalankan Unit Tests (Jest):**
```bash
npm run test
# Untuk melihat coverage
npm run test:coverage
```

**Menjalankan E2E Tests (Playwright):**
```bash
npx playwright test
# Untuk melihat laporan E2E
npx playwright show-report
```

---

## 🚀 Deployment

Proyek ini dikonfigurasi untuk ter-deploy secara otomatis menggunakan [Vercel](https://vercel.com/) setiap kali ada *push* ke *branch* utama (main/master). CI/CD pipeline dengan GitHub Actions memastikan hanya kode yang lolos linting dan testing yang akan di-deploy.
