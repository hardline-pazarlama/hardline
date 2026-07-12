import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "@/lib/data";

export const metadata: Metadata = {
  title: "İşletme Üyeliği — TeslimGüven",
};

const extraRevenue = [
  {
    icon: "🎯",
    title: "Talep (Lead) Paketleri",
    text: "Plan limitinin üzerinde müşteri talebi almak isteyen işletmeler için talep başına ücretli paketler. Bölge ve kategori bazlı fiyatlandırma.",
  },
  {
    icon: "🎓",
    title: "Sertifika Akademisi",
    text: "Elbirliği prosedür eğitimi ve yıllık sertifika yenilemesi. Kurumsal olmayan planlarda personel başına ücretli eğitim.",
  },
  {
    icon: "📣",
    title: "Sponsorlu Görünürlük",
    text: "Şehir ve kategori sayfalarında sponsorlu üst sıra, ana sayfa vitrini ve kampanya bülteninde banner alanları.",
  },
  {
    icon: "🤝",
    title: "Finansman Firması İş Birlikleri",
    text: "Tasarruf finansman firmalarına, müşterilerinin teslimat deneyim verilerine dayalı raporlama ve tavsiye ağı entegrasyonu (B2B abonelik).",
  },
];

export default function MembershipPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-ink-900">İşletme Üyelik Planları</h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink-600">
          Her ay binlerce tasarruf finansman müşterisi teslimat almaya hak
          kazanıyor ve nereden alacağını arıyor. Bu hazır kitleye ulaşmanın en
          güvenilir yolu TeslimGüven üyeliği.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.tier}
            className={`relative flex flex-col rounded-3xl border p-7 ${
              plan.emphasized
                ? "border-brand-600 shadow-lg ring-1 ring-brand-200"
                : "border-slate-200"
            }`}
          >
            {plan.emphasized && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                En Popüler
              </span>
            )}
            <h2 className="text-lg font-bold text-ink-900">{plan.name}</h2>
            <div className="mt-3">
              <span className="text-4xl font-extrabold text-ink-900">
                {plan.monthlyPrice.toLocaleString("tr-TR")} ₺
              </span>
              <span className="text-sm text-slate-500"> /ay</span>
            </div>
            <p className="mt-1 text-sm text-brand-700">
              Yıllık ödemede aylık {plan.yearlyPrice.toLocaleString("tr-TR")} ₺
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-ink-600">
                  <span className="text-brand-600">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              className={`mt-7 rounded-xl py-3 font-semibold transition-colors ${
                plan.emphasized
                  ? "bg-brand-600 text-white hover:bg-brand-700"
                  : "bg-slate-100 text-ink-900 hover:bg-slate-200"
              }`}
            >
              {plan.name} ile Başla
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Fiyatlara KDV dahil değildir. İlk 30 gün koşulsuz iade garantisi.
      </p>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-ink-900">Üyelik Ötesi Büyüme Kanalları</h2>
        <p className="mt-2 max-w-2xl text-ink-600">
          TeslimGüven geliri yalnızca abonelikten ibaret değildir; platform
          büyüdükçe devreye giren ek gelir kanalları:
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {extraRevenue.map((r) => (
            <div key={r.title} className="rounded-2xl border border-slate-200 p-6">
              <div className="text-3xl">{r.icon}</div>
              <h3 className="mt-3 font-semibold text-ink-900">{r.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-brand-800 px-8 py-10 text-center text-white">
        <h2 className="text-2xl font-bold">Sorularınız mı var?</h2>
        <p className="mx-auto mt-2 max-w-xl text-brand-100">
          Üyelik danışmanlarımız işletmenize en uygun planı belirlemek için
          hazır. Başvurunuzu bırakın, 24 saat içinde dönüş yapalım.
        </p>
        <Link
          href="/teklif-al?tip=isletme"
          className="mt-5 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 transition-colors hover:bg-brand-50"
        >
          İşletme Başvurusu Yap
        </Link>
      </section>
    </div>
  );
}
