# Akay Finance — Koperasi Simpan Pinjam (Next.js + NextAuth v5 + Prisma + Midtrans + Google Sheets)

## Setup lokal
```
cp .env.example .env
# Edit .env (DATABASE_URL, NEXTAUTH_SECRET/AUTH_SECRET, MIDTRANS, dll)
npm i
npm run db:push
npm run db:seed
npm run dev
```
Login contoh: member@akay.finance / member123 — admin@akay.finance / admin123

## Deploy Vercel
Tambahkan env Production:
- DATABASE_URL (Neon pooled + sslmode=require)
- NEXTAUTH_URL = https://<domain>
- NEXTAUTH_SECRET & AUTH_SECRET (pakai nilai yg sama)
- MIDTRANS_SERVER_KEY, NEXT_PUBLIC_MIDTRANS_CLIENT_KEY, NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION
- GOOGLE_SHEETS_WEBHOOK (opsional)

Lalu jalankan migrasi/seed:
```
npx prisma migrate deploy || npx prisma db push
node prisma/seed.cjs
```

Midtrans: Notification URL → `/api/payments/midtrans/notification`
Finish URL → `/thanks`
