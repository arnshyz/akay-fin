export const runtime = "nodejs";

import Image from "next/image";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  async function doLogin(formData: FormData) {
    "use server";
    await signIn("credentials", formData, { redirectTo: "/dashboard" });
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: "80px auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <Image src="/akay-logo.svg" alt="Akay Finance" width={28} height={28} />
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Masuk Akay Finance</h1>
      </div>

      <form action={doLogin} style={{ display: "grid", gap: 12 }}>
        <div>
          <label className="label">Email</label>
          <input className="input" name="email" placeholder="member@akay.finance" />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" name="password" placeholder="••••••••" />
        </div>
        <button className="btn" type="submit" style={{ width: "100%" }}>
          Masuk
        </button>
      </form>

      <p style={{ fontSize: 12, color: "#64748b", marginTop: 10 }}>
        Contoh akun — Member: <b>member@akay.finance</b> / <b>member123</b> — Admin: <b>admin@akay.finance</b> / <b>admin123</b>
      </p>
    </div>
  );
}
