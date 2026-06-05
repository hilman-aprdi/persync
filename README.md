# Persync

AI Business Direction Assistant.

## Stack

- Frontend: Next.js + Tailwind CSS
- Backend: Express.js
- Database: PostgreSQL
- AI: Gemini API

## Struktur

- `fe` frontend Next.js business direction UI
- `be` backend Express API
- `docs` dokumentasi setup

## Quick Start

1. Jalankan PostgreSQL:

```bash
docker compose up -d postgres
```

2. Siapkan backend:

```bash
cd be
npm install
npm run db:init
npm run dev
```

Isi `be/.env` secara manual:

```env
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/persync
GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-2.5-flash
GOOGLE_CLIENT_ID=your_google_client_id_here
JWT_SECRET=replace_with_a_long_random_secret
```

3. Siapkan frontend:

```bash
cd fe
npm install
npm run dev
```

Isi `fe/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

## Production Notes

- Jangan commit `.env` production atau secret nyata ke repo.
- Gunakan [be/.env.example](/C:/portfolio/persync/be/.env.example:1) dan [fe/.env.example](/C:/portfolio/persync/fe/.env.example:1) sebagai template.
- Jalankan migration/schema init terpisah sebelum boot aplikasi:

```bash
cd be
npm run db:init
```

- Untuk production, set `AUTO_RUN_DB_INIT=false` agar aplikasi tidak memodifikasi schema saat startup.
- `JWT_SECRET`, `APP_URL`, dan `CORS_ORIGIN` harus memakai nilai production yang valid; backend sekarang akan fail-fast bila masih memakai konfigurasi lemah atau localhost di mode production.
