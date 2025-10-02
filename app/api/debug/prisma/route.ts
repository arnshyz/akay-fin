export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

function mask(url?: string) {
  return url ? url.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:***@") : undefined;
}

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;

    // Info koneksi yang sedang dipakai server
    const info = await prisma.$queryRawUnsafe<any>(`
      select current_database() as db,
             current_user      as usr,
             inet_server_addr()::text as host,
             current_schema()  as schema
    `);

    // Cek tabel penting (case sensitive)
    const tables = await prisma.$queryRawUnsafe<any[]>(`
      select table_name
      from information_schema.tables
      where table_schema='public'
        and table_name in (
          'User','user','users',
          'SavingsAccount','Transaction','DepositRequest','WithdrawalRequest',
          'Loan','Repayment'
        )
      order by table_name;
    `);

    // Coba hitung jumlah user dengan raw SQL (pakai "User" quoted)
    let rawCount: number | null = null;
    try {
      const r = await prisma.$queryRawUnsafe<any[]>(`select count(*)::int as c from "User"`);
      rawCount = r?.[0]?.c ?? null;
    } catch {
      // abaikan; bisa null kalau tabel "User" belum ada
    }

    // Coba hitung via Prisma model (kalau gagal, kirimkan errornya)
    let prismaCount: number | null = null;
    try {
      prismaCount = await prisma.user.count();
    } catch (e: any) {
      return new Response(
        JSON.stringify({
          env: { DATABASE_URL: mask(dbUrl) },
          info: info?.[0],
          tables: tables.map(t => t.table_name),
          rawCount,
          prismaCountError: { code: e?.code, message: e?.message }
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        env: { DATABASE_URL: mask(dbUrl) },
        info: info?.[0],
        tables: tables.map(t => t.table_name),
        rawCount,
        prismaCount
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (e: any) {
    console.error("[debug/prisma] top-level:", e);
    return new Response(
      JSON.stringify({
        topLevelError: { code: e?.code, message: e?.message },
        env: { DATABASE_URL: mask(process.env.DATABASE_URL) }
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
