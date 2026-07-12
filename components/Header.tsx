import Link from "next/link";

const navItems = [
  { href: "/isletmeler", label: "Galeriler & Emlakçılar" },
  { href: "/kampanyalar", label: "Kampanyalar" },
  { href: "/nasil-calisir", label: "Nasıl Çalışır?" },
  { href: "/uyelik", label: "İşletmeler İçin" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
            T
          </span>
          <span className="text-lg font-bold tracking-tight text-ink-900">
            Teslim<span className="text-brand-600">Güven</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/teklif-al"
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Ücretsiz Teklif Al
        </Link>
      </div>
    </header>
  );
}
