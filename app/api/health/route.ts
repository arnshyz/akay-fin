// app/api/health/route.ts
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Cek koneksi DB
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ ok: true, db: "connected" }, { status: 200 });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ ok: false, error: e?.message || String(e) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
