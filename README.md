# CRUD Next.js + MySQL (Aiven) -> Vercel

## Jalanin lokal
1. `npm install`
2. Copy `.env.example` jadi `.env.local`, isi kredensial dari Aiven
3. `npm run dev` lalu buka http://localhost:3000

Tabel `notes` dibuat otomatis pas query pertama (atau jalanin `schema.sql` manual).

## Deploy
1. Push ke GitHub
2. Vercel -> Add New Project -> import repo
3. Settings -> Environment Variables: isi DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME (DB_CA opsional)
4. Deploy

## Aiven
- Service MySQL harus status Running
- Allowed IP addresses: Vercel IP-nya dinamis, jadi biarin default 0.0.0.0/0
