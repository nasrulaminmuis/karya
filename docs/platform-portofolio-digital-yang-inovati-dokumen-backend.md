# Dokumen Backend

## Tech Stack Backend

- **libraries**: bcrypt v5.1 - Untuk hashing password user secara aman., jsonwebtoken v9.0 - Untuk pembuatan dan verifikasi JSON Web Tokens (JWT) sebagai metode otentikasi stateless, axios v1.6 - Klien HTTP untuk integrasi dengan API eksternal (misal: GitHub API untuk US-4)., @nestjs/throttler v5.1 - Untuk implementasi rate limiting pada API guna mencegah penyalahgunaan dan serangan brute-force.
- **language**: Node.js v20 LTS
- **framework**: nextjs
- **orm**: Prisma v5.12

## Rancangan Storage

**Database**: PostgreSQL v16

Rancangan database relasional untuk platform portofolio programmer, mencakup manajemen pengguna, proyek, keahlian, sertifikasi, pengaturan personalisasi, integrasi repositori, dan analitik. Fokus pada keamanan data dan performa, sesuai dengan User Stories dan Alur Pengguna.

### Tabel: `users`
> Menyimpan informasi dasar pengguna (programmer/developer), detail otentikasi, dan pengaturan profil inti.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password_hash | TEXT | NOT NULL |
| username | VARCHAR(100) | UNIQUE, NOT NULL |
| full_name | VARCHAR(255) |  |
| bio | TEXT |  |
| profile_picture_url | VARCHAR(500) |  |
| email_verified | BOOLEAN | NOT NULL, DEFAULT FALSE |
| verification_token | VARCHAR(225) |  |
| mfa_enabled | BOOLEAN | NOT NULL, DEFAULT FALSE |
| mfa_secret | TEXT |  |
| custom_url_slug | VARCHAR(100) | UNIQUE |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Tabel: `portfolio_settings`
> Menyimpan pengaturan personalisasi tampilan portofolio (tema, tata letak, warna) untuk setiap pengguna.

| Kolom | Tipe | Constraints |
|---|---|---|
| user_id | UUID | PRIMARY KEY |
| theme_name | VARCHAR(50) | NOT NULL, DEFAULT 'default' |
| layout_type | VARCHAR(50) | NOT NULL, DEFAULT 'grid' |
| primary_color | VARCHAR(20) | NOT NULL, DEFAULT '#007bff' |
| secondary_color | VARCHAR(20) | NOT NULL, DEFAULT '#6c757d' |
| font_family | VARCHAR(100) | NOT NULL, DEFAULT 'Arial, sans-serif' |

### Tabel: `social_links`
> Menyimpan tautan ke profil media sosial atau platform profesional lainnya milik pengguna.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| platform | VARCHAR(50) | NOT NULL |
| url | VARCHAR(500) | NOT NULL |

### Tabel: `projects`
> Menyimpan detail proyek yang ditambahkan oleh pengguna ke portofolionya.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | NOT NULL |
| project_url | VARCHAR(500) |  |
| repository_url | VARCHAR(500) |  |
| start_date | DATE |  |
| end_date | DATE |  |
| is_published | BOOLEAN | NOT NULL, DEFAULT TRUE |
| created_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Tabel: `technologies`
> Menyimpan daftar master teknologi/bahasa pemrograman yang dapat digunakan dalam proyek atau sebagai keahlian.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| name | VARCHAR(100) | UNIQUE, NOT NULL |
| icon_url | VARCHAR(500) |  |

### Tabel: `project_technologies`
> Tabel penghubung (many-to-many) antara proyek dan teknologi yang digunakan.

| Kolom | Tipe | Constraints |
|---|---|---|
| project_id | UUID | NOT NULL |
| technology_id | UUID | NOT NULL |

### Tabel: `project_media`
> Menyimpan tautan dan detail media (gambar/video) untuk setiap proyek, yang akan ditampilkan di portofolio.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| project_id | UUID | NOT NULL |
| media_type | VARCHAR(50) | NOT NULL |
| url | VARCHAR(500) | NOT NULL |
| thumbnail_url | VARCHAR(500) |  |
| description | TEXT |  |
| order_index | INTEGER | NOT NULL, DEFAULT 0 |

### Tabel: `user_skills`
> Menyimpan daftar keahlian dan level penguasaan teknologi yang dikuasai oleh setiap pengguna.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| technology_id | UUID | NOT NULL |
| proficiency_level | VARCHAR(50) | NOT NULL |
| years_of_experience | INTEGER | NOT NULL, DEFAULT 0 |

### Tabel: `certifications_awards`
> Menyimpan daftar sertifikat, kursus, atau penghargaan yang dimiliki pengguna untuk menunjukkan kredibilitas.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| title | VARCHAR(255) | NOT NULL |
| issuer | VARCHAR(255) | NOT NULL |
| issue_date | DATE | NOT NULL |
| expiration_date | DATE |  |
| credential_url | VARCHAR(500) |  |
| description | TEXT |  |

### Tabel: `integrations`
> Menyimpan informasi integrasi dengan platform repositori kode eksternal (misal: GitHub, GitLab).

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| platform | VARCHAR(50) | NOT NULL |
| access_token_encrypted | TEXT | NOT NULL |
| refresh_token_encrypted | TEXT |  |
| username_on_platform | VARCHAR(100) |  |
| profile_url_on_platform | VARCHAR(500) |  |
| connected_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Tabel: `portfolio_visits`
> Mencatat setiap kunjungan (page view) ke halaman portofolio pengguna secara keseluruhan untuk analitik.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| visitor_ip | INET |  |
| user_agent | TEXT |  |
| referrer | VARCHAR(500) |  |
| visited_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Tabel: `project_impressions`
> Mencatat setiap kali proyek pengguna ditampilkan atau dilihat (impresi) untuk analitik.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| project_id | UUID | NOT NULL |
| visitor_ip | INET |  |
| user_agent | TEXT |  |
| impressed_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Tabel: `project_interactions`
> Mencatat interaksi spesifik pengunjung dengan proyek (misal: klik demo, klik repo) untuk analitik.

| Kolom | Tipe | Constraints |
|---|---|---|
| id | UUID | PRIMARY KEY, NOT NULL, DEFAULT gen_random_uuid() |
| user_id | UUID | NOT NULL |
| project_id | UUID | NOT NULL |
| interaction_type | VARCHAR(50) | NOT NULL |
| visitor_ip | INET |  |
| user_agent | TEXT |  |
| interacted_at | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

## API Endpoints

1. **POST** `/api/auth/register` — Mendaftarkan pengguna baru dengan nama, email, dan password.
2. **GET** `/api/auth/verify-email` — Memverifikasi alamat email pengguna menggunakan token verifikasi.
3. **POST** `/api/auth/login` — Login pengguna dengan email dan password.
4. **POST** `/api/auth/mfa/setup` — Menginisialisasi pengaturan otentikasi multi-faktor (MFA) untuk pengguna yang sedang login.
5. **POST** `/api/projects` — Menambah proyek baru ke portofolio pengguna.
6. **PUT** `/api/projects/:id` — Mengedit detail proyek yang sudah ada.
7. **DELETE** `/api/projects/:id` — Menghapus proyek dari portofolio pengguna.
8. **PUT** `/api/profile/theme` — Memilih tema, tata letak, dan warna untuk personalisasi profil portofolio.
9. **POST** `/api/skills` — Menambahkan keahlian dan tingkat penguasaannya ke profil pengguna.
10. **POST** `/api/certificates` — Menambahkan sertifikat, kursus, atau penghargaan ke profil pengguna.
11. **GET** `/api/analytics/portfolio` — Melihat analitik portofolio seperti jumlah kunjungan dan impresi proyek untuk pengguna yang sedang login.
12. **POST** `/api/integrations/github/connect` — Menginisiasi proses integrasi dengan GitHub (OAuth). Akan mengarahkan ke GitHub.
13. **GET** `/api/public/users/:username` — Melihat profil publik seorang developer berdasarkan username.
14. **GET** `/api/public/users/:username/projects` — Melihat daftar proyek publik dari seorang developer.
15. **GET** `/api/public/search/developers` — Mencari developer berdasarkan kata kunci, keahlian, atau kriteria lainnya.

## Environment Variables

| Key | Deskripsi |
|---|---|
| `PORT` | Port di mana server akan berjalan. |
| `NODE_ENV` | Lingkungan aplikasi (development, production, test). |
| `DATABASE_URL` | Connection string ke database (misal: PostgreSQL, MongoDB). |
| `JWT_SECRET` | Secret key yang digunakan untuk menandatangani dan memverifikasi JWT token. |
| `JWT_EXPIRES_IN` | Masa berlaku JWT token. |
| `EMAIL_SERVICE_HOST` | Host server SMTP untuk pengiriman email. |
| `EMAIL_SERVICE_PORT` | Port server SMTP. |
| `EMAIL_SERVICE_USER` | Username untuk otentikasi server SMTP. |
| `EMAIL_SERVICE_PASS` | Password untuk otentikasi server SMTP. |
| `FRONTEND_URL` | URL frontend aplikasi, digunakan untuk tautan verifikasi email atau reset password. |
| `MFA_SECRET_KEY` | Secret key untuk keperluan MFA (misal: generation of QR codes for TOTP). |
| `GITHUB_CLIENT_ID` | Client ID untuk aplikasi GitHub OAuth. |
| `GITHUB_CLIENT_SECRET` | Client Secret untuk aplikasi GitHub OAuth. |
| `CLOUDINARY_CLOUD_NAME` | Nama cloud di Cloudinary untuk penyimpanan media. |
| `CLOUDINARY_API_KEY` | API Key Cloudinary. |
| `CLOUDINARY_API_SECRET` | API Secret Cloudinary. |