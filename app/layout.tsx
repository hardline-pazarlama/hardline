import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TeslimGüven — Elbirliği Sisteminde Güvenilir Galeri ve Emlakçılar",
  description:
    "Eminevim, Katılımevim, Fuzul Ev ve Birevim gibi tasarruf finansman sistemleriyle ev, araç veya işyeri alanlar için doğrulanmış, puanlanmış galeri ve emlak ofisleri. Güncel kampanyalar tek adreste.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
