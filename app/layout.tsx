export const runtime = "nodejs"; // aman untuk fitur server-side

import "./globals.css";

export const metadata = {
  title: "Akay Finance",
  description: "Koperasi Simpan Pinjam berbasis member",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
