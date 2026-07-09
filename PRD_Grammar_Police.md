# Product Requirements Document (PRD)
# Grammar Police — Platform Simulasi Komunikasi Bahasa Inggris Berbasis AI

**Versi:** 1.0
**Disusun untuk:** Tim pengembang / agentic coding tool (mis. Claude Code)
**Sumber:** Proposal LIDM "Grammar Police" (Divisi Inovasi Teknologi Digital Pendidikan, ULM) + prototype interaktif `grammar-police(1).html`
**Status referensi desain:** `grammar-police(1).html` adalah **source of truth visual** — bukan sekadar mockup untuk dilihat, tapi kode yang strukturnya (CSS variables, komponen, animasi, copywriting) harus **dipertahankan dan dipindahkan (porting)** ke aplikasi produksi, bukan didesain ulang dari nol.

---

## 1. Ringkasan Produk

Grammar Police adalah *serious game* berbasis web bertema perjalanan ("Driver" melewati serangkaian "Gerbang Tol Grammar") yang menggunakan Large Language Model (LLM) sebagai mitra percakapan dinamis untuk melatih grammar dan speaking bahasa Inggris secara kontekstual. Prototype yang sudah ada (`grammar-police(1).html`) adalah simulasi **client-side murni** (semua logic, data gate, dan validasi jawaban berupa regex hardcoded di JavaScript, tanpa backend/AI sungguhan). Tugas dari PRD ini adalah membangun **versi produksi full-stack** yang menggantikan logic tiruan tersebut dengan sistem nyata (LLM API, backend, database), **sambil mempertahankan 100% bahasa visual, komponen, dan alur UX yang sudah divalidasi di prototype**.

---

## 2. Masalah yang Diselesaikan (ringkasan dari proposal)

| Gap | Deskripsi |
|---|---|
| **Contextual gap** | Latihan grammar konvensional (pilihan ganda/isian) tidak merepresentasikan percakapan nyata. |
| **Feedback gap** | Sistem lama hanya menilai benar/salah tanpa penjelasan metalinguistik. |
| **Engagement gap** | Latihan repetitif menurunkan motivasi; tidak ada elemen game. |
| **Learning inefficiency** | Semua pengguna mendapat soal sama, tidak adaptif terhadap pola kesalahan individu. |

Data pendukung: EF EPI 2025 menempatkan Indonesia peringkat ke-80/123 (skor 471), dengan speaking (447) sebagai titik terlemah dibanding reading (491) dan writing (479).

---

## 3. Tujuan Produk & Metrik Keberhasilan

Metrik ini **wajib** dapat diukur oleh sistem yang dibangun (bukan hanya klaim kualitatif) — instrumentasi untuk masing-masing harus ada di backend/analytics:

| Aspek | Indikator | Target |
|---|---|---|
| Pedagogik | N-Gain Score (pre-test vs post-test) | Kategori sedang (≥ 0,30) s.d. tinggi |
| Usability & Engagement | Skor System Usability Scale (SUS) | > 70 (Good/Acceptable) |
| Teknis (Akurasi AI) | Akurasi deteksi kesalahan grammar kontekstual oleh LLM | > 85% |
| Retensi progres | Gates Cleared / Accuracy Rate per sesi | Tercatat & tampil transparan di dashboard |

---

## 4. Target Pengguna

1. **Pembelajar EFL** — pelajar SMA/MA s.d. mahasiswa tahun pertama (subjek uji coba: 30–40 orang, daring).
2. **Guru/Pendidik** — menerima ringkasan pola kesalahan kolektif kelas, bertindak sebagai otoritas epistemik yang memverifikasi output AI (bukan digantikan olehnya).
3. **Institusi pendidikan** — membutuhkan indikator terukur (Gates Cleared, Accuracy Rate) untuk evaluasi program.

---

## 5. Referensi Desain & Asset — `grammar-police(1).html`

Agen coding **wajib membuka dan mempelajari file ini sebelum menulis kode apa pun**, lalu mem-port elemen berikut ke dalam design system produksi (mis. Tailwind config + komponen React), **tanpa mengubah nilai warna, animasi, copy, atau struktur visual** kecuali diminta eksplisit di PRD ini.

### 5.1 Design Tokens (wajib dipindahkan ke `tailwind.config`/CSS variables global)

```css
--navy-deep:  #081426
--navy:       #0e2242
--navy-card:  #14335e
--navy-card-2:#1a3d6d
--line:       rgba(255,255,255,0.09)
--gold:       #f5c542
--gold-2:     #ffdf7a
--green:      #2e9e52
--green-dark: #1f7a3d
--blue-btn:   #2f6fed
--blue-btn-2: #5b8dff
--red:        #e0455a
--ink:        #eef3fb
--ink-dim:    #9fb2cf
font-family: 'Segoe UI', system-ui, -apple-system, sans-serif
```

Background utama: gradient radial navy (`radial-gradient` di `body`) — dipertahankan sebagai background global aplikasi.

### 5.2 Komponen visual yang harus di-porting apa adanya

| Komponen (nama class asli) | Fungsi | Catatan porting |
|---|---|---|
| `.masthead` + `.badge-star` (animasi `spinStar`) | Judul aplikasi + badge bintang berputar | Jadikan komponen `<Masthead />` |
| `.frame` / `.statusbar` | Bingkai aplikasi + status bar (level, XP, stars, coins, hearts) | `<StatusBar level xp xpMax stars coins hearts />`, pertahankan `.pill.pulse` animation saat reward bertambah |
| `.sidebar` (`Journey/Garage/Achievements/Backpack/Settings`) | Navigasi utama, disembunyikan di layar gate/challenge dan di mobile (`@media max-width:720px`) | `<SideNav activeItem />` |
| `.scene` (hills, road, lane animasi `laneMove`, gate-tower, gate-sign, `.barrier` dgn animasi buka `rotate(-72deg)`, `.car` idle-bob, `.officer` + `robotHtml()`) | Backdrop simulasi gerbang tol | `<GateScene title gateOpen npcMessage />`; robot officer jadi komponen `<RobotOfficer size="small|large" />` re-usable (dipakai juga di layar AI Analyzing & remedial) |
| `.bubble` / `.officer-bubble` | Speech bubble NPC AI | Pertahankan `popIn` animation |
| `.card`, `.row`/`.col` | Layout dasar | Tailwind grid setara |
| `.answer-box` + `.btn-submit` | Input jawaban kalimat bebas | `<SentenceInput onSubmit />`, submit via Enter key (pertahankan UX ini) |
| `.fb-icon.ok` / `.fb-icon.bad`, `.explain-box`, `.your-answer-box`, `.fb-wrong-box`, `.rewards-card` | Layar feedback benar/salah | `<FeedbackCorrect />` & `<FeedbackWrong />` |
| `.opt-grid`/`.opt-btn` (highlight correct/wrong on click) | Remedial multiple-choice | `<RemedialChoice options correct />` |
| `.tiles`/`.tile`, `.built-line` | Word Scramble | `<WordScrambleChallenge words correct />` |
| `.sentence-target`, input koreksi | Correction Mode | `<CorrectionChallenge sentence correct />` |
| `.mistake-list`, `.thinking-dots` (animasi `tdots`) | Layar AI Analyzing | `<AIAnalyzing mistakes />` — dots animation dipertahankan sebagai indikator "AI sedang berpikir" |
| `.progress-card`, `.level-shield` (hexagon `clip-path`, animasi `shieldPop`), `.next-list` | Adaptive Difficulty screen | `<AdaptiveDifficultyResult />` |
| `.summary-card` | Journey Summary | `<JourneySummary />` |
| `@media (prefers-reduced-motion: reduce)` | Aksesibilitas — semua animasi di-nonaktifkan | **Wajib dipertahankan** di semua komponen baru |

### 5.3 Aturan konsistensi asset

- Semua ikon tetap emoji-based (🛡️⭐🪙❤️🚗🧭🏆🎒⚙️) — **jangan** diganti ikon SVG/library lain kecuali direncanakan sebagai peningkatan terpisah dan disetujui.
- Robot officer tetap dibangun dari CSS (bukan gambar/ilustrasi bitmap) agar ringan — selaras dengan tujuan proposal poin 6 ("desain sistem yang ringan... tetap diakses pada kondisi jaringan terbatas").
- Copy microcopy (mis. "Oops! Not quite.", "Great job!", "Let's practice a bit more!", "The difficulty is now adapted to help you learn more effectively!") dipertahankan sebagai default string, dapat di-i18n-kan tetapi bahasa Inggris tetap default karena ini media latihan bahasa Inggris.

---

## 6. Ruang Lingkup

### 6.1 MVP (Fase 1–2 sesuai proposal)
- Autentikasi dasar (pengguna & guru)
- Journey flow lengkap: Home → Sentence Gate → Feedback (benar/salah) → Remedial (Word Scramble/Correction) → AI Analyzing → Adaptive Difficulty → Journey Summary
- Integrasi LLM sungguhan sebagai Contextual Grammar Evaluator + Multi-stage Feedback Provider
- Penyimpanan progres pengguna di MySQL (bukan lagi `state` in-memory JS)
- Minimal 3 kategori grammar (tense, subject-verb agreement, preposition) dengan bank soal dinamis (bukan 4 gate hardcoded)

### 6.2 Fase 3–4 (sesuai proposal)
- Error Pattern Analyzer lintas-sesi (bukan hanya per sesi) untuk penyesuaian level jangka panjang
- Achievements, Garage, Backpack (saat ini hanya placeholder navigasi di prototype)
- Dashboard guru: ringkasan pola kesalahan kolektif kelas
- Instrumen evaluasi: pre-test/post-test, kuesioner SUS in-app, ekspor data untuk analisis N-Gain

### 6.3 Di luar cakupan (eksplisit)
- Voice/speech-to-text (proposal menyebut "speaking" secara konseptual, tapi desain teknis & prototype hanya text-based chatbox) — dicatat sebagai potensi Fase 5, bukan bagian PRD ini.
- Native mobile app — cukup responsive web (breakpoint 720px sudah ada di prototype).

---

## 7. Arsitektur Teknis

Sesuai spesifikasi proposal (bagian "Perangkat Lunak"):

```
┌─────────────────────┐        ┌──────────────────────────┐        ┌────────────────────┐
│   Frontend (Vercel)  │  REST  │   Backend (Render)        │  API   │   LLM Provider      │
│   Next.js + React    │◄──────►│   Node.js/Express          │◄──────►│   OpenAI GPT-4o /   │
│   Tailwind CSS       │        │   (atau Python FastAPI)   │        │   Gemini 2.5 Flash  │
│   (porting dari      │        │   + LangChain orchestration│        │   via LangChain     │
│    grammar-police    │        └──────────┬────────────────┘        └────────────────────┘
│    .html)            │                   │
└─────────────────────┘                   ▼
                                ┌──────────────────────────┐
                                │  MySQL (Aiven for MySQL)   │
                                │  users, sessions, gates,   │
                                │  attempts, error_patterns  │
                                └──────────────────────────┘
```

- **Version control & CI:** Git & GitHub.
- **Kontribusi AI vs kode manual:** sesuai proposal, AI (LLM) berkontribusi ~40% dari arsitektur (evaluasi grammar real-time), 60% sisanya (gamifikasi, alur, UI, orkestrasi) dikerjakan tim/agent coding secara eksplisit — **AI tidak boleh dijadikan alat validasi tunggal tanpa lapisan aturan/struktur dari sistem**.

---

## 8. Modul Fungsional (Functional Requirements)

Setiap modul ditulis sebagai user story + acceptance criteria agar bisa langsung dieksekusi oleh agentic coding tool secara bertahap.

### 8.1 Autentikasi & Profil Pengguna
- **Story:** Sebagai pengguna, saya bisa mendaftar/login agar progres saya (level, XP, coins, riwayat kesalahan) tersimpan antar sesi.
- **AC:**
  - Register/login (email+password minimal; opsi OAuth jadi *nice-to-have*).
  - Role: `student` dan `teacher`.
  - Setelah login, `StatusBar` menampilkan data asli dari DB, bukan `state` hardcoded prototype (`level:3, xp:450, xpMax:900, stars:210, coins:860, hearts:3`).

### 8.2 Halaman Utama (Home / Dashboard)
- **Story:** Sebagai pengguna, saya melihat dashboard petualangan dan menekan "Start Journey" untuk memulai sesi baru.
- **AC:** Sesuai `renderHome()` prototype — scene kosong + badge "GRAMMAR POLICE" + tombol `Start Journey 🚗`. Sidebar aktif menampilkan 5 menu (Journey aktif secara default).

### 8.3 Gate/Checkpoint Engine (Simulasi Percakapan)
- **Story:** Sebagai pengguna, saya berhadapan dengan gerbang tol tata bahasa dan mengetik jawaban bebas di chatbox.
- **AC:**
  - Backend menyediakan endpoint yang mengembalikan gate berikutnya secara **dinamis** (dipilih dari bank soal + kategori kelemahan pengguna), bukan array statis 4 item seperti prototype.
  - 3 tipe tantangan dipertahankan: `sentence` (percakapan bebas), `scramble` (Word Scramble), `correction` (Correction Mode) — sesuai struktur `gates[]` di prototype.
  - UI & animasi barrier/`animateGateOpenThen()` dipertahankan persis.

### 8.4 Contextual Grammar Evaluator (LLM — pengganti `g.check(ans)` regex)
- **Story:** Sebagai sistem, saya perlu menilai kebenaran struktur & makna kontekstual jawaban pengguna secara real-time menggunakan LLM, bukan regex tetap.
- **AC:**
  - Endpoint `POST /api/gates/:gateId/submit` mengirim jawaban ke backend → backend memanggil LLM dengan prompt terstruktur (lihat §11) → menerima hasil terstruktur JSON: `{ isCorrect, explanation, errorCategory, correctedSentence }`.
  - Response digunakan untuk merender `FeedbackCorrect`/`FeedbackWrong` (menggantikan `renderFeedbackCorrect`/`renderFeedbackWrong` di prototype 1:1 secara visual).
  - Fallback: jika LLM API gagal/timeout, sistem harus tetap merespons (mis. retry sekali, lalu pesan error ramah — **tidak boleh membuat pengguna stuck**).

### 8.5 Multi-stage Feedback Provider
- **Story:** Sebagai pengguna, saat salah saya menerima penjelasan metalinguistik sederhana, bukan sekadar "salah".
- **AC:** Field `explanation` dari LLM ditampilkan di `.explain-box` sesuai styling prototype; bahasa penjelasan harus disederhanakan agar tidak menyebabkan cognitive overload (proposal §Latar Belakang) — batasi panjang ≤ 2 kalimat per penjelasan (constraint di prompt LLM).

### 8.6 Remedial Engine Adaptif
- **Story:** Sebagai pengguna yang salah, saya diarahkan ke mode remedial (Word Scramble/Correction Mode) untuk berlatih ulang materi dasar sebelum lanjut.
- **AC:**
  - Pertahankan alur: Wrong → `Practice a bit more →` → Remedial → lanjut ke gate berikutnya (`renderRemedial`, `renderScrambleGate`, `renderCorrectionGate`).
  - Konten remedial idealnya juga dihasilkan/divariasikan oleh LLM berdasarkan kesalahan spesifik pengguna (bukan opsi hardcoded `['go','goes','am going','is going']`), dengan bank soal fallback jika LLM tidak tersedia.

### 8.7 Error Pattern Analyzer & Adaptive Difficulty
- **Story:** Sebagai sistem, saya melacak kategori kesalahan pengguna (`tense`, `agreement`, `preposition`, dst.) dan menyesuaikan tingkat kesulitan gate berikutnya.
- **AC:**
  - Layar `AI Analyzing` (dengan `thinking-dots`) dipertahankan sebagai *loading state* yang jujur menampilkan proses backend menghitung `mistakes{}` — bukan animasi kosmetik semata; datanya harus real dari agregasi jawaban sesi (dan idealnya lintas sesi, disimpan di tabel `error_patterns`).
  - Level naik otomatis jika akurasi sesi ≥ 75% (logic `renderAdaptiveDifficulty` dipertahankan sebagai aturan awal, dapat di-tuning).
  - `nextFocusList()` — daftar topik prioritas berikutnya — dihasilkan dari kategori kesalahan terbanyak, ditampilkan di `.next-list`.

### 8.8 Gamifikasi
- **Story:** Sebagai pengguna, saya mendapat XP, koin, dan status hearts/streak yang memotivasi saya untuk terus bermain.
- **AC:**
  - Reward tetap: **+20 XP, +10 Coins** per gate benar (sesuai prototype & proposal Gambar 3).
  - `hearts` berkurang saat salah (`Math.max(0, hearts-1)`) — definisikan aturan game-over/heart-regen sebagai keputusan produk baru (belum ada di prototype, perlu ditentukan tim: mis. hearts regenerasi per 24 jam).
  - `streak` naik saat benar berturut-turut, reset ke 0 saat salah.
  - Modul `Achievements`, `Garage`, `Backpack` di sidebar saat ini hanya label statis di prototype — di Fase 2 didefinisikan sebagai:
    - **Achievements**: badge otomatis (mis. "5 gates tanpa salah", "Level 5 tercapai").
    - **Garage**: koleksi kustomisasi kendaraan yang dibeli dengan Coins.
    - **Backpack**: item bantu (mis. "hint" atau "extra heart") dibeli dengan Coins.

### 8.9 Journey Summary & Analytics
- **Story:** Sebagai pengguna, di akhir sesi saya melihat ringkasan capaian (Gates Cleared, Accuracy Rate, Total XP, Coins Earned).
- **AC:** Sesuai `renderSummary()` — data harus dipersist ke DB agar guru/institusi bisa menariknya untuk evaluasi program (proposal §Dampak, Bagi Institusi).

### 8.10 Panel Guru (Fase 2)
- **Story:** Sebagai guru, saya melihat pola kesalahan kolektif siswa di kelas saya untuk memfokuskan pengajaran tatap muka.
- **AC:** Dashboard agregat (bukan bagian dari prototype saat ini, dirancang baru) menampilkan distribusi kategori kesalahan per kelas/grup, tren N-Gain, dan skor SUS rata-rata.

---

## 9. Skema Data (ringkas)

```
users            (id, name, email, password_hash, role[student|teacher], level, xp, coins, hearts, streak, created_at)
sessions         (id, user_id, started_at, ended_at, gates_cleared, gates_total, accuracy_rate, total_xp, coins_earned)
gate_templates   (id, category[tense|agreement|preposition|...], type[sentence|scramble|correction], difficulty, npc_prompt, seed_content JSON)
attempts         (id, session_id, gate_template_id, user_answer, is_correct, llm_explanation, error_category, attempted_at)
error_patterns   (id, user_id, category, count, last_updated)
achievements     (id, user_id, badge_code, earned_at)
evaluations      (id, user_id, type[pretest|posttest|sus], score, raw_answers JSON, submitted_at)  -- untuk instrumen N-Gain & SUS di proposal §F
```

---

## 10. Spesifikasi API (ringkas)

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/register`, `/api/auth/login` | Autentikasi |
| GET | `/api/journey/next-gate` | Ambil gate berikutnya (dipilih adaptif berdasar `error_patterns` user) |
| POST | `/api/gates/:id/submit` | Kirim jawaban → panggil LLM Evaluator → simpan `attempts` → return feedback JSON |
| POST | `/api/gates/:id/remedial` | Submit jawaban remedial (scramble/correction) |
| GET | `/api/analysis/session/:sessionId` | Ambil hasil AI Analyzing (agregasi `mistakes{}`) |
| POST | `/api/session/:id/complete` | Tutup sesi, hitung `accuracy_rate`, simpan summary |
| GET | `/api/teacher/class/:classId/patterns` | Dashboard guru (Fase 2) |
| POST | `/api/evaluations` | Submit hasil pre-test/post-test/SUS |

---

## 11. Kontrak LLM (Prompt & Output Schema)

**Prinsip:** LLM tidak pernah mengembalikan teks bebas ke frontend — selalu melalui backend yang memaksa **structured output JSON**, agar UI (`.explain-box`, `.fb-icon`, dsb.) bisa merender secara konsisten seperti prototype.

Contoh contract (Contextual Grammar Evaluator):

```json
// System prompt (ringkas):
// "You are Grammar Police, an AI that evaluates a learner's English sentence
// in context. Respond ONLY in JSON. Keep explanation ≤2 short sentences,
// simple metalinguistic language suitable for EFL learners. Never include
// markdown or preamble."

// Expected response schema:
{
  "isCorrect": true,
  "errorCategory": "tense" | "agreement" | "preposition" | "other" | null,
  "explanation": "string, max 2 sentences",
  "correctedSentence": "string or null if already correct"
}
```

Fungsi `wrongExplain()`/`correctExplain` hardcoded di prototype menjadi **contoh kualitas & nada bahasa** yang harus ditiru oleh output LLM (ramah, singkat, langsung ke inti aturan).

---

## 12. Skema Konten Gate (generalisasi dari `gates[]` hardcoded)

Struktur `gates` di prototype (`id, type, title, npc, check, correctExplain, wrongExplain, remedial, category`) menjadi template `gate_templates` di DB — `check` (regex) **dihapus** karena digantikan evaluasi LLM real-time; `remedial.options` menjadi opsional (bisa di-generate LLM atau diambil dari bank soal fallback per kategori).

---

## 13. Kebutuhan Non-Fungsional

- **Ringan & tahan jaringan terbatas:** hindari asset gambar berat; pertahankan pendekatan CSS-only untuk karakter/scene seperti prototype. Backend harus punya timeout & fallback response bila API LLM lambat.
- **Aksesibilitas:** pertahankan `@media (prefers-reduced-motion: reduce)`; kontras warna gold-on-navy sudah AA-friendly, jangan diturunkan.
- **Keamanan:** validasi/sanitasi input jawaban pengguna sebelum dikirim ke LLM (prompt-injection awareness — pengguna bisa mencoba memasukkan instruksi aneh di jawaban bebas teks).
- **Responsif:** breakpoint mobile 720px dipertahankan (`sidebar` disembunyikan di layar sempit, sesuai prototype).
- **Observability:** log setiap panggilan LLM (request/response, latency) untuk mendukung indikator "akurasi sistem >85%" yang perlu dievaluasi manual secara berkala.

---

## 14. Rencana Pengujian

Selaras dengan proposal §F (Teknik Pengumpulan dan Analisis Data):

1. **Unit & integration test** (engineering): setiap endpoint API, khususnya Contextual Grammar Evaluator dan Adaptive Difficulty logic.
2. **Pre-test/Post-test** in-app (`evaluations` table, type `pretest`/`posttest`) → hitung N-Gain.
3. **Kuesioner SUS** in-app setelah sesi ke-N → hitung skor indeks usability.
4. **Wawancara semi-terstruktur** (di luar sistem, kualitatif) → dukung dengan fitur ekspor data attempts/error_patterns untuk analisis tematik tim peneliti.
5. **UAT visual** — bandingkan tiap layar produksi dengan screenshot Gambar 1–9 di proposal untuk memastikan tidak ada regresi visual dari prototype.

---

## 15. Fase Pengembangan (mapping ke 4 fase proposal)

| Fase Proposal | Deliverable Teknis |
|---|---|
| 1. Perancangan Arsitektur & UI/UX | Porting design system dari `grammar-police(1).html` ke Next.js/Tailwind component library; skema DB awal |
| 2. Integrasi LLM & Validasi Jawaban | Endpoint submit-answer terhubung LLM; sentence-gate end-to-end berfungsi dengan data nyata |
| 3. Mekanisme Gamifikasi Remedial | Word Scramble & Correction Mode berfungsi dengan konten dinamis; reward XP/Coins persist di DB |
| 4. Sistem Adaptif & Evaluasi | Error Pattern Analyzer lintas sesi, Adaptive Difficulty, Journey Summary, instrumen SUS/pretest-posttest |

---

## 16. Definition of Done (produk secara keseluruhan)

- [ ] Semua 9 layar prototype (Home, Sentence Gate, Feedback Correct, Feedback Wrong, Remedial, Word Scramble, Correction Mode, AI Analyzing, Adaptive Difficulty, Summary) berjalan dengan data **nyata** dari backend+LLM+DB, secara visual identik dengan prototype.
- [ ] Progres pengguna persisten antar sesi/login.
- [ ] Skor SUS internal tim ≥ 70 sebelum rilis ke subjek uji coba eksternal.
- [ ] Akurasi evaluasi LLM diverifikasi manual pada sample ≥100 jawaban, mencapai >85% kesesuaian dengan penilaian pakar bahasa.
- [ ] Dashboard guru (Fase 2) menampilkan data agregat kelas real (bukan dummy).

---

## 17. Risiko & Mitigasi (dari proposal, dipetakan ke keputusan teknis)

| Risiko | Mitigasi teknis |
|---|---|
| Misinformasi dari LLM | Structured output + validasi kategori kesalahan terbatas pada daftar topik grammar yang didukung; guru tetap memverifikasi |
| Cognitive overload | Batasi panjang `explanation` (≤2 kalimat) via prompt constraint |
| Ketergantungan perilaku (overdependence) | Rate-limit hint/remedial otomatis; dorong penyelesaian mandiri sebelum bantuan tambahan muncul |
| Jaringan tidak stabil | Desain ringan (CSS-only asset), backend fallback response, cache gate template di client |

---

## 18. Lampiran — Pemetaan Fungsi Prototype → Modul Produksi

| Fungsi JS di `grammar-police(1).html` | Pengganti di produksi |
|---|---|
| `state = {...}` (in-memory) | Tabel `users`/`sessions` di MySQL + state management client (React context/Zustand) |
| `gates[]` hardcoded + `g.check(ans)` regex | `gate_templates` di DB + panggilan LLM real-time |
| `renderHome()`, `renderSentenceGate()`, dst. | Komponen React per layar, styling class dipertahankan identik |
| `renderFeedbackCorrect/Wrong` | Dipicu oleh response JSON dari `/api/gates/:id/submit` |
| `renderAIAnalyzing()` + `nextFocusList()` | Endpoint `/api/analysis/session/:id` mengagregasi `attempts.error_category` sungguhan |
| `renderAdaptiveDifficulty()` | Logic level-up dipindah ke backend, hasil dikirim ke frontend untuk dirender ulang |
| `robotHtml()`, `sceneHtml()` | Komponen `<RobotOfficer />`, `<GateScene />` reusable |

**Catatan akhir untuk agentic coding tool:** mulai implementasi dengan **membaca file `grammar-police(1).html` secara utuh terlebih dahulu**, ekstrak seluruh CSS ke dalam design tokens/komponen sebelum menulis satu baris pun logic baru. Jangan mendesain ulang tampilan — tugas utama adalah mengganti "otak" (logic tiruan) prototype dengan sistem produksi (LLM + backend + database) sambil menjaga "wajah" (UI/UX) tetap sama persis.
