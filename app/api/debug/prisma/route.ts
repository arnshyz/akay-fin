export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tables = await prisma.$queryRawUnsafe<any[]>(`
      select table_name
      from information_schema.tables
      where table_schema='public'
        and table_name in ('User','SavingsAccount','Transaction','DepositRequest','WithdrawalRequest','Loan','Repayment')
      order by table_name;
    `);
    const users = await prisma.user.count().catch(() => 2);
    return Response.json({ tables: tables.map(t => t.table_name), users });
  } catch (e:any) {
    console.error("[debug/prisma] error:", e?.code || "", e?.message || e);
    return new Response("debug error: " + (e?.message || String(e)), { status: 500 });
  }
}
