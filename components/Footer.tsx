import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              B
            </span>
            <span className="font-bold text-ink-900">
              bulevim<span className="text-brand-600">.com</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-600">
            Elbirliği sistemiyle ev, araç ve işyeri alanlar için güvenilir
            galeri ve emlakçı platformu.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Keşfet</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li><Link href="/isletmeler?tip=galeri" className="hover:text-brand-700">Oto Galeriler</Link></li>
            <li><Link href="/isletmeler?tip=emlak" className="hover:text-brand-700">Emlak Ofisleri</Link></li>
            <li><Link href="/kampanyalar" className="hover:text-brand-700">Güncel Kampanyalar</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Platform</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li><Link href="/nasil-calisir" className="hover:text-brand-700">Nasıl Çalışır?</Link></li>
            <li><Link href="/uyelik" className="hover:text-brand-700">İşletme Üyeliği</Link></li>
            <li><Link href="/teklif-al" className="hover:text-brand-700">Teklif Al</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Yasal Uyarı</h3>
          <p className="mt-3 text-sm text-ink-600">
            Bulevim bağımsız bir platformdur; tasarruf finansman
            şirketlerinin resmî temsilcisi değildir. Kampanya bilgileri
            ilgili firmaların duyurularından derlenir.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
        © 2026 bulevim.com. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
