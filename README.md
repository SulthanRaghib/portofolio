# 🚀 Sulthan Raghib Fillah — Personal Portfolio Website

<div align="center">

  ![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?style=for-the-badge&logo=framer&logoColor=white)

  <p align="center">
    <b>Sebuah website portofolio profesional dan modern berbasis Next.js 15 (App Router), React 19, TypeScript, dan Tailwind CSS v4 yang dirancang dengan performa tinggi, animasi interaktif, arsitektur data adaptif (Hybrid API & Fallback), serta dukungan multibahasa (Bilingual).</b>
  </p>

  <p align="center">
    <a href="#-fitur-utama">Fitur Utama</a> •
    <a href="#-teknologi--dependensi">Teknologi</a> •
    <a href="#-struktur-direktori">Struktur Proyek</a> •
    <a href="#-prasyarat--instalasi">Instalasi</a> •
    <a href="#-dokumentasi-modul--arsitektur-logika">Arsitektur & Modul</a> •
    <a href="#-environment-variables">Konfigurasi</a> •
    <a href="#-deployment--seo">Deployment</a>
  </p>

</div>

---

## 🌟 Tentang Proyek

Website portofolio ini dibangun untuk menampilkan profil profesional, keahlian teknis, portofolio proyek (*Featured Projects & Archive*), serta riwayat sertifikasi (*Certifications & In-App PDF Viewer*) dari **Sulthan Raghib Fillah** (Full Stack Web Developer & Backend Engineer).

Dirancang mengutamakan estetika visual modern, kenyamanan pengguna (*User Experience*), responsivitas lintas perangkat, dan aksesibilitas. Dilengkapi mikro-interaksi canggih dari **React Bits**, animasi *Framer Motion*, partikel dinamis *OGL WebGL*, serta sistem *fail-safe* di mana website tetap dapat beroperasi 100% menggunakan data *offline fallback* apabila server REST API eksternal sedang mengalami *downtime*.

---

## ✨ Fitur Utama

| Modul / Fitur | Deskripsi |
| :--- | :--- |
| 🌐 **Bilingual (EN / ID)** | Penggantian bahasa instan (*English & Bahasa Indonesia*) secara reaktif menggunakan React Context tanpa *page reload*. |
| 🌓 **Dual Theme (Dark / Light)** | Dukungan tema Gelap & Terang dinamis menggunakan `next-themes` dengan variabel warna OKLCH modern. |
| 🎨 **React Bits Micro-Interactions** | Efek teks terenkripsi (*DecryptedText*), *TiltedCard* 3D tilt, *SpotlightCard*, partikel dinamis, teks berputar (*RotatingText*), *Magnet* CTA, dan efek klik *ClickSpark*. |
| 🌊 **Seamless Section Transitions** | Pembatas antar-section menggunakan gelombang kurva SVG dengan *CSS Linear Gradient* (`var(--muted)` ke `var(--background)`) untuk transisi warna yang halus tanpa potongan kaku. |
| 💼 **Proyek Interaktif & Halaman Arsip (`/projects`)** | Showcase proyek unggulan di halaman utama serta subhalaman arsip lengkap dengan pencarian, filter kategori (All, Featured, Web, AI), dan pengurutan (*Sorting*). |
| 📜 **Sertifikasi & In-App PDF Viewer (`/certifications`)** | Showcase sertifikasi dengan verifikasi ID kredensial, filter dinamis berdasarkan penerbit (*Issuer*) & keahlian (*Skills*), serta pratinjau dokumen PDF langsung di dalam modal (*PdfPageViewer* via `pdfjs-dist`). |
| 🪟 **React Portal Preview Modal** | Modal pratinjau sertifikat yang di-render langsung ke `document.body` menggunakan React Portal guna memastikan *z-index* absolut, bebas *clipping*, dan *viewport centering* yang sempurna. |
| 📬 **Formulir Kontak Terintegrasi** | Form pesan langsung terhubung ke layanan **EmailJS** dengan validasi input komprehensif, umpan balik visual sukses/gagal, dan indikator waktu respons. |
| 🛡️ **Hybrid Data Resiliency** | Logika data pintar: mengambil data terkini via REST API, dan otomatis beralih ke *local fallback dataset* jika terjadi kegagalan jaringan atau server *offline*. |
| 🔍 **SEO & Sitemap Otomatis** | Dilengkapi OpenGraph metadata, robots metadata, verifikasi mesin pencari, dan generator sitemap otomatis (`next-sitemap`). |

---

## 🛠️ Teknologi & Dependensi

### **Core Stack**
- **Framework:** [Next.js 15.5.9](https://nextjs.org/) (App Router & Server Components support)
- **Library:** [React 19.1.0](https://react.dev/) & [React DOM 19.1.0](https://react.dev/)
- **Bahasa:** [TypeScript 5](https://www.typescriptlang.org/) (Strict mode, full type-safety)
- **Styling:** [Tailwind CSS v4.1](https://tailwindcss.com/) dengan `@tailwindcss/postcss` & `tw-animate-css`

### **Animasi & Interaktivitas UI**
- **[Framer Motion 12](https://www.framer.com/motion/):** Animasi transisi elemen, layout animatics, dan modal overlay.
- **[GSAP 3](https://greensock.com/gsap/):** Manipulasi timeline dan performa animasi tingkat tinggi.
- **[OGL 1.0](https://github.com/oframe/ogl):** Library WebGL ringan untuk simulasi partikel dinamis pada section Hero.
- **[Lucide React](https://lucide.dev/):** Set ikon vektor modern dan konsisten.
- **[Radix UI Primitives](https://www.radix-ui.com/):** Komponen dasar aksesibel (`@radix-ui/react-slot`, `react-label`, `react-toast`).

### **Integrasi Layanan & Utilitas**
- **[PDF.js (`pdfjs-dist`)](https://mozilla.github.io/pdf.js/):** Rendering canvas PDF per halaman di dalam browser.
- **[EmailJS (`emailjs-com`)](https://www.emailjs.com/):** Pengiriman pesan formulir kontak langsung dari client ke inbox email.
- **[next-themes](https://github.com/pacocoursey/next-themes):** Manajemen tema light/dark yang bebas *hydration flicker*.
- **[next-sitemap](https://github.com/iamvishnusankar/next-sitemap):** Generator `sitemap.xml` dan `robots.txt` otomatis saat *build*.

---

## 📁 Struktur Direktori

```plaintext
portofolio/
├── public/                     # Aset statis publik (gambar, CV/Resume PDF, icons)
│   ├── assets/                 # Foto profil, file PDF resume & media pendukung
│   ├── og-image.jpg            # Preview banner OpenGraph untuk media sosial
│   ├── robots.txt              # Konfigurasi perayap mesin pencari
│   └── sitemap.xml             # Sitemap XML yang di-generate otomatis
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── certifications/     # Halaman arsip sertifikasi (/certifications)
│   │   │   └── page.tsx
│   │   ├── projects/           # Halaman arsip proyek (/projects)
│   │   │   └── page.tsx
│   │   ├── globals.css         # Styling global & token warna tema OKLCH
│   │   ├── layout.tsx          # Root layout (Metadata SEO, Theme & Language Provider)
│   │   ├── page.tsx            # Landing Page utama (Kompilasi semua section)
│   │   ├── robots.ts           # Route handler Metadata robots
│   │   └── sitemap.ts          # Route handler Metadata sitemap
│   ├── components/             # Komponen antarmuka React
│   │   ├── context/            # React Context (LanguageContext - EN/ID)
│   │   │   └── language-context.tsx
│   │   ├── sections/           # Section modular halaman utama
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── CertificationsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/                 # Komponen UI atomik & React Bits
│   │   │   ├── react-bits/     # Partikel, TiltedCard, Magnet, AnimatedContent, dll.
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── textarea.tsx
│   │   ├── certification-card.tsx
│   │   ├── certification-preview-modal.tsx
│   │   ├── contact-form.tsx
│   │   ├── footer.tsx
│   │   ├── navbar.tsx
│   │   ├── pdf-page-viewer.tsx
│   │   └── project-card.tsx
│   ├── data/                   # Dataset lokal cadangan (Offline Fallback)
│   │   ├── fallback-certifications.ts
│   │   └── fallback-projects.ts
│   ├── hooks/                  # Custom React Hooks
│   │   ├── use-certifications.ts
│   │   ├── use-projects.ts
│   │   └── use-toast.ts
│   ├── lib/                    # Utilitas & Layanan API
│   │   ├── api.ts              # Fetching API dengan mekanisme fallback otomatis
│   │   ├── cloudinary-utils.ts # Helper manipulasi URL aset Cloudinary
│   │   └── utils.ts            # Helper Tailwind merge (cn utility)
│   └── types/                  # Definisi TypeScript Interface & Types
│       ├── assets.d.ts
│       ├── certification.ts
│       └── project.ts
├── next-sitemap.config.js      # Konfigurasi post-build generator sitemap
├── next.config.ts              # Konfigurasi Next.js (Webpack, remote image domains)
├── package.json                # Skrip & daftar dependensi proyek
└── tsconfig.json               # Konfigurasi TypeScript
```

---

## ⚙️ Prasyarat & Instalasi

### **1. Prasyarat Lingkungan**
Pastikan lingkungan pengembangan Anda telah terpasang:
- **Node.js**: Versi `18.18.0` atau yang lebih baru (disarankan Node.js `20.x` LTS)
- **Package Manager**: `npm`, `yarn`, `pnpm`, atau `bun`
- **Git**: Versi terbaru

### **2. Kloning Repositori**
```bash
git clone https://github.com/SulthanRaghib/portofolio.git
cd portofolio
```

### **3. Instalasi Dependensi**
```bash
npm install
```

### **4. Konfigurasi Environment Variables**
Salin atau buat file `.env.local` di direktori *root* proyek:
```bash
cp .env.example .env.local
```

Isi variabel konfigurasi berikut:
```env
# ============================================
# BACKEND API CONFIGURATION
# ============================================
NEXT_PUBLIC_API_BASE_URL=https://portofolio-backend-beta.vercel.app/api

# ============================================
# EMAILJS CONFIGURATION (Formulir Kontak)
# ============================================
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_EMAILJS_TO_EMAIL=sulthan.raghib09@gmail.com
```

### **5. Menjalankan Server Pengembangan**
```bash
npm run dev
```
Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Dokumentasi Modul & Arsitektur Logika

### **1. Sistem Data Adaptif (Hybrid API & Offline Fallback)**
Salah satu keunggulan arsitektur proyek ini adalah ketahanan data (*fault tolerance*) di `src/lib/api.ts`:
```
[Client / Hook: useProjects / useCertifications]
                     │
                     ▼
             [Fetch REST API]
              /            \
        (Berhasil)      (Gagal / Offline)
           /                  \
          ▼                    ▼
[Format Data API]     [Gunakan Fallback Data Lokal]
          \                    /
           ▼                  ▼
     [Render Antarmuka Pengguna Tanpa Error]
```
- Saat klien meminta data, fungsi `getProjects()` atau `getCertifications()` akan memanggil REST API eksternal.
- Jika API berhasil merespons, data dari server langsung ditampilkan.
- Jika terjadi kendala koneksi, API *down*, atau dibatasi *CORS*, sistem secara otomatis beralih ke `fallbackProjects` atau `fallbackCertifications` di folder `src/data/` tanpa memunculkan layar putih/error ke pengunjung.

---

### **2. Manajemen Bahasa (Internationalization / i18n Context)**
Terletak pada `src/components/context/language-context.tsx`:
- Menyediakan hook `useLanguage()` dengan *state* `language` (`"EN"` | `"ID"`) dan fungsi `toggleLanguage()`.
- Default bahasa adalah **English (EN)**, dan dapat diubah menjadi **Bahasa Indonesia (ID)** melalui tombol di *Navbar* desktop maupun *drawer* mobile.
- Semua judul, teks deskripsi, *call-to-action*, dan label formulir secara langsung mengadaptasi bahasa yang aktif secara instan.

---

### **3. Animasi Interaktif (React Bits & Framer Motion)**
Website mengintegrasikan komponen interaktif canggih:
- **`RotatingText`**: Menganimasikan transisi pergantian gelar profesional di section *Hero* secara vertikal setiap 3 detik.
- **`TiltedCard`**: Menghitung posisi kursor *mouse* secara matematis untuk memberikan rotasi kemiringan 3D (*amplitude tilt*) pada foto profil di section *About*.
- **`SpotlightCard`**: Menggambar *radial gradient* dinamis yang mengikuti koordinat kursor pengguna pada kotak keahlian dan formulir.
- **`Magnet`**: Menarik elemen tombol secara proporsional ke arah kursor saat disentuh *hover*.
- **`ClickSpark`**: Menembakkan partikel animasi menggunakan HTML5 Canvas saat tombol diklik.
- **`PdfPageViewer`**: Membaca *binary buffer* PDF dan merendernya ke elemen `<canvas>` secara asinkron dan bebas korupsi transformasi memori.

---

### **4. Transisi Section Organik (SVG Linear Gradient Wave Dividers)**
Untuk menghilangkan efek potongan garis horizontal yang kaku antar-section:
- Setiap batas section dengan warna berbeda (`bg-background` dan `bg-muted`) dilengkapi pembatas SVG dengan `<linearGradient>`.
- Menggunakan variabel warna CSS dinamis (`var(--background)` dan `var(--muted)`), sehingga gradien gelombang tetap menyatu sempurna baik pada mode gelap maupun mode terang.

---

### **5. Integrasi Pengiriman Pesan (EmailJS)**
Terletak pada `src/components/contact-form.tsx`:
- Memvalidasi *field* nama depan, nama belakang, format email yang valid, subjek, serta isi pesan.
- Mengirimkan data formulir langsung ke API EmailJS menggunakan kredensial publik dari `.env.local`.
- Menyediakan status interaktif: *loading spinner*, pesan konfirmasi sukses hijau dengan *auto-dismiss*, dan *error handling*.

---

## 📜 Skrip NPM yang Tersedia

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan Next.js lokal pada port 3000. |
| `npm run build` | Melakukan kompilasi produksi, type-checking, optimasi bundle, dan pembuatan sitemap. |
| `npm run start` | Menjalankan server produksi hasil kompilasi. |
| `npm run lint` | Menjalankan pemeriksaan ESLint pada seluruh berkas kode sumber. |
| `npm run postbuild` | Menjalankan eksekusi `next-sitemap` untuk memperbarui berkas sitemap statis. |

---

## 🚀 Deployment

Proyek ini teroptimasi untuk di-deploy pada platform modern seperti **Vercel** atau **Netlify**:

### **Deploy di Netlify**
Proyek telah dilengkapi file konfigurasi [netlify.toml](file:///c:/laragon/www/portofolio/netlify.toml) untuk pengaturan *header cache* dan tipe konten XML/TXT sitemap:
1. Hubungkan repositori GitHub Anda ke Netlify.
2. Atur perintah build: `npm run build`.
3. Atur direktori publik: `.next`.
4. Masukkan seluruh *Environment Variables* (`NEXT_PUBLIC_*`) pada menu *Site configuration* > *Environment variables*.
5. Jalankan *Deploy*.

---

<div align="center">
  <sub>Dikembangkan dengan ❤️ dan dedikasi oleh <b><a href="https://linkedin.com/in/sulthan-raghib-fillah">Sulthan Raghib Fillah</a></b></sub>
</div>
