export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rupiah } from "@/lib/rupiah";

export default async function AdminPage(){
  const session = await auth();
  const role = (session as any)?.role as string | undefined;
  if(role !== "ADMIN") return <div className="card" style={{maxWidth:420, margin:"80px auto"}}>Hanya untuk Admin.</div>;

  const [depositReqs, withdrawalReqs] = await Promise.all([
    prisma.depositRequest.findMany({ include:{ user:true }, orderBy:{ createdAt:"desc" } }),
    prisma.withdrawalRequest.findMany({ include:{ user:true }, orderBy:{ createdAt:"desc" } }),
  ]);

  return (<div>
    <h1 style={{fontSize:26, fontWeight:800, marginBottom:12}}>Panel Admin</h1>
    <div className="card" style={{marginTop:12}}>
      <h2 style={{fontWeight:700, marginBottom:6}}>Pengajuan Setoran</h2>
      <table><thead><tr><th>Waktu</th><th>Member</th><th>Jumlah</th><th>Status</th></tr></thead>
        <tbody>{depositReqs.map((r:any)=>(
          <tr key={r.id}><td>{new Date(r.createdAt).toLocaleString("id-ID")}</td><td>{r.user?.email}</td><td>{rupiah(r.amount)}</td><td>{r.status}</td></tr>
        ))}</tbody>
      </table>
    </div>
    <div className="card" style={{marginTop:12}}>
      <h2 style={{fontWeight:700, marginBottom:6}}>Pengajuan Penarikan</h2>
      <table><thead><tr><th>Waktu</th><th>Member</th><th>Jumlah</th><th>Status</th></tr></thead>
        <tbody>{withdrawalReqs.map((r:any)=>(
          <tr key={r.id}><td>{new Date(r.createdAt).toLocaleString("id-ID")}</td><td>{r.user?.email}</td><td>{rupiah(r.amount)}</td><td>{r.status}</td></tr>
        ))}</tbody>
      </table>
    </div>
  </div>);
}
