# Dokumen Umum Aplikasi

## Deskripsi
Platform portofolio digital yang inovatif bagi programmer untuk memamerkan keahlian dan proyek mereka secara profesional, mengatasi tantangan menjaga portofolio tetap menarik dan terkini dengan antarmuka yang intuitif.

## Fitur Utama
- Manajemen Proyek (Tambah, Edit, Hapus proyek dengan detail, teknologi, tautan, media)
- Integrasi Repositori Kode (GitHub, GitLab, Bitbucket untuk menampilkan kontribusi dan kode)
- Kustomisasi Profil (Pilihan tema, tata letak, warna untuk personalisasi portofolio)
- Daftar Keahlian & Teknologi (Bagian khusus untuk mencantumkan skill teknis dan level penguasaan)
- Tampilan Proyek Interaktif (Mendukung demo, tangkapan layar, atau video proyek)
- Analitik Portofolio (Melacak jumlah kunjungan, impresi proyek, dan interaksi)
- Opsi Berbagi Portofolio (URL unik yang mudah dibagikan, tautan ke media sosial)
- Manajemen Sertifikasi & Penghargaan (Bagian untuk menambahkan sertifikat, kursus, atau penghargaan)

## Kebutuhan Non-Fungsional
- Autentikasi & Otorisasi (Login/Signup, verifikasi email, otorisasi berbasis peran jika ada)
- Keamanan Data (Enkripsi data, perlindungan DDoS, otentikasi multi-faktor)
- Performa Tinggi (Pemuatan cepat, responsif untuk pengalaman pengguna optimal)
- Skalabilitas (Mampu menangani peningkatan jumlah pengguna, proyek, dan data secara efisien)
- Ketersediaan (Uptime tinggi untuk memastikan platform selalu dapat diakses)
- Antarmuka Pengguna Intuitif (Desain UI/UX yang mudah dipahami dan digunakan)
- Kompatibilitas Lintas Perangkat (Web responsif, mobile-first)
- Sistem Cadangan & Pemulihan Data (Untuk mencegah kehilangan data dan memastikan kontinuitas layanan)

## User Personas
- **Programmer/Developer**: Profesional IT dari berbagai tingkat pengalaman yang ingin menampilkan karya dan keahlian mereka secara profesional untuk mencari pekerjaan atau klien. (Needs: Platform mudah digunakan untuk mengelola dan memperbarui portofolio, tampilan menarik, integrasi dengan repositori kode, analitik untuk melihat kinerja portofolio.)
- **Calon Klien**: Individu atau perusahaan yang mencari programmer atau tim untuk mengerjakan proyek tertentu, mulai dari startup hingga perusahaan besar. (Needs: Memahami kapabilitas teknis developer, melihat contoh proyek yang relevan dan kualitas kerja, kemudahan menghubungi developer untuk diskusi proyek.)

## User Stories
- **Programmer/Developer**: dapat menambah proyek baru dengan detail, teknologi, tautan, dan media (gambar/video) -> portofolio saya selalu terupdate dengan karya terbaru dan terlihat menarik.
- **Programmer/Developer**: dapat mengedit detail proyek yang sudah ada -> informasi proyek saya selalu akurat dan relevan.
- **Programmer/Developer**: dapat menghapus proyek dari portofolio saya -> saya bisa menjaga konten yang ditampilkan tetap relevan dan berkualitas.
- **Programmer/Developer**: dapat mengintegrasikan portofolio saya dengan repositori kode (misal: GitHub, GitLab, Bitbucket) -> calon klien dapat melihat kontribusi kode dan kualitas pekerjaan saya secara langsung.
- **Programmer/Developer**: dapat memilih tema, tata letak, dan warna untuk personalisasi profil portofolio saya -> portofolio saya mencerminkan gaya pribadi dan terlihat profesional.
- **Programmer/Developer**: dapat mencantumkan daftar keahlian dan teknologi yang saya kuasai beserta level penguasaannya -> calon klien dapat dengan mudah memahami kapabilitas teknis saya.
- **Programmer/Developer**: dapat melihat analitik portofolio seperti jumlah kunjungan, impresi proyek, dan interaksi -> saya bisa memahami efektivitas portofolio saya dan melakukan perbaikan.
- **Programmer/Developer**: memiliki URL unik yang mudah dibagikan dan opsi untuk menautkan ke media sosial -> saya dapat mempromosikan portofolio saya dengan mudah.
- **Programmer/Developer**: dapat menambahkan sertifikat, kursus, atau penghargaan ke profil saya -> saya dapat menunjukkan kredibilitas dan pencapaian profesional saya.
- **Programmer/Developer**: dapat mendaftar dan masuk ke akun saya dengan aman -> saya dapat mengelola portofolio saya secara pribadi dan terlindungi.
- **Programmer/Developer**: email saya diverifikasi saat pendaftaran -> akun saya lebih aman dan saya dapat menerima notifikasi penting.
- **Programmer/Developer**: data portofolio saya dilindungi dengan enkripsi -> informasi pribadi dan proyek saya tetap aman dari akses tidak sah.
- **Programmer/Developer**: platform saya mendukung otentikasi multi-faktor (MFA) -> keamanan akun saya lebih terjamin.
- **Programmer/Developer**: halaman portofolio saya dimuat dengan cepat dan responsif -> pengunjung memiliki pengalaman yang baik dan tidak meninggalkan halaman karena lambat atau tidak responsif.
- **Programmer/Developer**: antarmuka platform mudah dipahami dan digunakan -> saya dapat mengelola portofolio saya tanpa kesulitan.
- **Programmer/Developer**: portofolio saya terlihat baik dan berfungsi optimal di berbagai perangkat (desktop, tablet, mobile) -> semua calon klien dapat mengaksesnya dengan mudah tanpa batasan perangkat.
- **Programmer/Developer**: data portofolio saya dicadangkan secara teratur dan dapat dipulihkan -> saya tidak kehilangan pekerjaan saya jika terjadi masalah pada sistem dan data saya aman.
- **Calon Klien**: dapat melihat demo, tangkapan layar, atau video dari proyek-proyek developer secara interaktif -> saya bisa menilai kualitas dan relevansi pekerjaan mereka secara visual dan mendalam.
- **Calon Klien**: dapat melihat daftar keahlian dan teknologi yang dikuasai developer -> saya bisa menemukan developer dengan skill yang sesuai kebutuhan proyek saya dengan cepat.
- **Calon Klien**: dapat mengakses repositori kode developer yang terintegrasi -> saya bisa menilai langsung kualitas kode dan kontribusi mereka.
- **Calon Klien**: dapat melihat sertifikasi dan penghargaan yang dimiliki developer -> saya dapat menilai kredibilitas dan profesionalisme mereka.
- **Calon Klien**: platform merespons dengan cepat saat saya menjelajahi portofolio -> saya dapat mencari developer tanpa hambatan dan efisien.
- **Calon Klien**: platform selalu dapat diakses dengan uptime yang tinggi -> saya bisa mencari dan menghubungi developer kapan saja saya butuhkan tanpa gangguan.
- **Calon Klien**: antarmuka platform mudah dinavigasi dan dipahami -> saya dapat menemukan informasi developer yang saya cari dengan cepat dan tanpa frustrasi.
- **Calon Klien**: dapat melihat portofolio dengan baik di perangkat apa pun yang saya gunakan (ponsel, tablet, desktop) -> saya memiliki fleksibilitas dalam mencari developer dari mana saja.

## User Flow
### **Alur Pengguna: Programmer/Developer**

Ini adalah alur yang akan dialami seorang Programmer/Developer saat menggunakan platform untuk mengelola dan memamerkan portofolionya.

#### **A. Pendaftaran & Pengelolaan Akun**
1.  **Mendaftar Akun (US-10, US-11):** Pengguna mengunjungi halaman pendaftaran dan mengisi informasi seperti nama, alamat email, dan kata sandi. Setelah itu, sistem akan mengirimkan email verifikasi ke alamat email yang didaftarkan. Pengguna harus membuka email tersebut dan mengklik tautan verifikasi untuk mengaktifkan akunnya, memastikan akunnya aman dan dapat menerima notifikasi penting.
2.  **Masuk ke Akun (US-10):** Setelah akun terdaftar dan terverifikasi, pengguna dapat masuk ke akunnya dengan menggunakan email dan kata sandi yang telah dibuat.
3.  **Mengatur Keamanan Akun (US-13):** Setelah masuk, pengguna dapat mengunjungi pengaturan keamanan akun untuk mengaktifkan Otentikasi Multi-Faktor (MFA), sehingga menambah lapisan keamanan pada akunnya.

#### **B. Membuat dan Mengelola Proyek Portofolio**
1.  **Menambah Proyek Baru (US-1):** Dari dashboard, pengguna memilih opsi "Tambah Proyek Baru". Pengguna kemudian mengisi detail proyek seperti judul, deskripsi, teknologi yang digunakan, tautan ke proyek (misalnya live demo atau repositori), dan mengunggah media (gambar atau video) yang relevan untuk menampilkan karyanya secara menarik.
2.  **Mengedit Detail Proyek (US-2):** Pengguna dapat memilih proyek yang sudah ada dari daftar portofolionya, lalu mengklik "Edit Proyek". Pengguna kemudian dapat mengubah detail proyek, teknologi, tautan, atau media agar informasi proyek selalu akurat dan relevan. Setelah selesai, perubahan disimpan.
3.  **Menghapus Proyek (US-3):** Jika ada proyek yang tidak lagi relevan atau tidak ingin ditampilkan, pengguna dapat memilih proyek tersebut dari daftar, lalu mengklik "Hapus Proyek". Setelah konfirmasi, proyek tersebut akan dihapus dari portofolio, membantu pengguna menjaga konten yang ditampilkan tetap relevan dan berkualitas.

#### **C. Menambahkan Keahlian dan Kredensial**
1.  **Mencantumkan Keahlian (US-6):** Dari dashboard atau halaman profil, pengguna menavigasi ke bagian "Keahlian". Di sini, pengguna dapat mencantumkan daftar keahlian dan teknologi yang dikuasainya, lengkap dengan level penguasaannya, sehingga calon klien dapat dengan mudah memahami kapabilitas teknisnya.
2.  **Menambahkan Sertifikasi & Penghargaan (US-9):** Pengguna menavigasi ke bagian "Sertifikasi dan Penghargaan" di profilnya. Pengguna dapat menambahkan sertifikat, kursus, atau penghargaan yang pernah diraih, yang berfungsi untuk menunjukkan kredibilitas dan pencapaian profesionalnya.

#### **D. Personalisasi dan Integrasi Portofolio**
1.  **Personalisasi Tampilan (US-5):** Dari pengaturan tampilan portofolio, pengguna dapat memilih tema, tata letak, dan skema warna yang sesuai dengan gaya pribadinya, memastikan portofolionya terlihat profesional dan mencerminkan identitasnya.
2.  **Integrasi Repositori Kode (US-4):** Pengguna dapat menavigasi ke pengaturan integrasi dan memilih untuk menghubungkan portofolionya dengan repositori kode populer (misalnya GitHub, GitLab, atau Bitbucket). Setelah otorisasi, calon klien dapat melihat kontribusi kode dan kualitas pekerjaan pengguna secara langsung.
3.  **Pengaturan URL & Media Sosial (US-8):** Dari pengaturan profil, pengguna dapat mengklaim URL unik untuk portofolionya yang mudah dibagikan. Pengguna juga dapat menambahkan tautan ke akun media sosial profesionalnya, memungkinkan promosi portofolio yang lebih mudah.

#### **E. Melihat Analitik Portofolio**
1.  **Akses Analitik (US-7):** Dari dashboard, pengguna menavigasi ke bagian "Analitik Portofolio". Di sini, pengguna dapat melihat data seperti jumlah kunjungan ke portofolio, impresi pada setiap proyek, dan interaksi pengunjung, yang membantunya memahami efektivitas portofolionya dan melakukan perbaikan jika diperlukan.

#### **F. Pengalaman Platform & Keamanan (Kualitas Non-Fungsional)**
1.  **Perlindungan Data (US-12):** Pengguna memiliki jaminan bahwa data portofolionya dilindungi dengan enkripsi, menjaga informasi pribadi dan proyek tetap aman dari akses tidak sah.
2.  **Kinerja & Responsivitas (US-14, US-16):** Selama berinteraksi dengan platform, pengguna akan merasakan bahwa halaman portofolionya dimuat dengan cepat dan responsif, serta terlihat baik di berbagai perangkat (desktop, tablet, mobile), memastikan pengalaman pengunjung yang optimal.
3.  **Kemudahan Penggunaan (US-15):** Pengguna akan menemukan antarmuka platform mudah dipahami dan digunakan, memungkinkan pengelolaan portofolio tanpa kesulitan.
4.  **Pencadangan Data (US-17):** Pengguna percaya bahwa data portofolionya dicadangkan secara teratur dan dapat dipulihkan, memberinya ketenangan pikiran bahwa pekerjaannya tidak akan hilang jika terjadi masalah sistem.

---

### **Alur Pengguna: Calon Klien**

Ini adalah alur yang akan dialami seorang Calon Klien saat mencari dan mengevaluasi Programmer/Developer melalui platform portofolio.

#### **A. Menjelajahi Portofolio Developer**
1.  **Mengakses Platform:** Calon klien mengunjungi platform portofolio untuk mencari developer.
2.  **Mencari Developer:** Calon klien dapat menggunakan fitur pencarian atau menjelajahi daftar developer yang tersedia berdasarkan kriteria tertentu.
3.  **Melihat Profil Developer:** Calon klien mengklik profil seorang developer yang menarik perhatiannya.
4.  **Melihat Keahlian Developer (US-19):** Pada halaman profil developer, calon klien langsung dapat melihat daftar keahlian dan teknologi yang dikuasai developer, membantunya menemukan developer dengan *skill* yang sesuai kebutuhan proyeknya dengan cepat.
5.  **Mengevaluasi Proyek (US-18):** Calon klien menelusuri daftar proyek yang ditampilkan oleh developer. Untuk setiap proyek, ia dapat melihat demo, tangkapan layar, atau video secara interaktif, yang memungkinkan penilaian kualitas dan relevansi pekerjaan developer secara visual dan mendalam.
6.  **Mengakses Repositori Kode (US-20):** Jika developer telah mengintegrasikan repositori kodenya, calon klien dapat mengklik tautan tersebut untuk mengaksesnya secara langsung. Ini memungkinkan calon klien untuk menilai langsung kualitas kode dan kontribusi developer.
7.  **Melihat Kredensial (US-21):** Calon klien dapat melihat sertifikasi, kursus, atau penghargaan yang dimiliki developer, yang berfungsi sebagai indikator kredibilitas dan profesionalisme.
8.  **Menghubungi Developer:** Setelah meninjau portofolio, calon klien dapat menggunakan opsi kontak yang disediakan (misalnya email atau tautan media sosial) untuk menghubungi developer.

#### **B. Pengalaman Interaksi Platform (Kualitas Non-Fungsional)**
1.  **Kecepatan Respons (US-22):** Selama menjelajahi portofolio, calon klien akan merasakan bahwa platform merespons dengan cepat, memungkinkan pencarian developer yang efisien tanpa hambatan.
2.  **Aksesibilitas & Uptime (US-23):** Calon klien akan menemukan bahwa platform selalu dapat diakses dengan *uptime* yang tinggi, memungkinkannya mencari dan menghubungi developer kapan saja ia butuhkan tanpa gangguan.
3.  **Kemudahan Navigasi (US-24):** Antarmuka platform mudah dinavigasi dan dipahami, membantu calon klien menemukan informasi developer yang dicari dengan cepat dan tanpa frustrasi.
4.  **Responsivitas Perangkat (US-25):** Calon klien akan melihat portofolio dengan baik dan berfungsi optimal di perangkat apa pun yang digunakan (ponsel, tablet, desktop), memberikan fleksibilitas dalam mencari developer dari mana saja.