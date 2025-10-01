export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tables = await prisma.$queryRawUnsafe<any[]>(`
    select table_name from information_schema.tables
    where table_schema='public'
      and table_name in ('User','SavingsAccount','Transaction','DepositRequest','WithdrawalRequest','Loan','Repayment')
    order by table_name;
  `);
  return Response.json({ tables: tables.map(t => t.table_name) });
}
