export const runtime = "nodejs";
export default function Home() {
  return (
    <div style={{maxWidth:540,margin:"80px auto",background:"#fff",padding:20,borderRadius:12}}>
      <h1 style={{fontSize:24,fontWeight:800}}>Akay Finance</h1>
      <p>Halaman utama siap. Klik untuk login.</p>
      <a className="btn" href="/">Ke Form Login</a>
    </div>
  );
}
