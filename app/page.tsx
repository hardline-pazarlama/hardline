import Link from "next/link";
import { businesses, campaigns, financeCompanies, sortBusinesses } from "@/lib/data";
import BusinessCard from "@/components/BusinessCard";
import CampaignCard from "@/components/CampaignCard";

export default function HomePage() {
  const featured = sortBusinesses(businesses).slice(0, 3);
  const latestCampaigns = campaigns.slice(0, 3);
  const totalDeliveries = businesses.reduce((s, b) => s + b.completedDeliveries, 0);
  const totalReviews = businesses.reduce((s, b) => s + b.reviewCount, 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <p className="mx-auto w-fit rounded-full border border-brand-200 bg-white px-4 py-1 text-sm font-medium text-brand-700">
            Eminevim · Katılımevim · Fuzul Ev · Birevim müşterileri için
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
            Teslimat zamanı geldi.{" "}
            <span className="text-brand-600">Kime güveneceğinizi</span> biz biliyoruz.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600">
            Elbirliği sistemiyle ev, araç veya işyeri almaya hak kazandınız ama
            nereden alacağınızı bilmiyor musunuz? Finansman prosedürlerine hakim,
            gerçek müşterilerce puanlanmış galeri ve emlak ofislerini keşfedin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/isletmeler?tip=galeri"
              className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              🚗 Araç Alacağım
            </Link>
            <Link
              href="/isletmeler?tip=emlak"
              className="rounded-xl bg-ink-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-700"
            >
              🏠 Ev / İşyeri Alacağım
            </Link>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: `${businesses.length}+`, label: "Üye İşletme" },
              { value: `${totalDeliveries}+`, label: "Tamamlanan Teslimat" },
              { value: `${totalReviews}+`, label: "Doğrulanmış Yorum" },
              { value: `${financeCompanies.length}`, label: "Finansman Sistemi" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-100 bg-white p-4">
                <div className="text-2xl font-extrabold text-brand-700">{s.value}</div>
                <div className="mt-1 text-sm text-ink-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sorun / Çözüm */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: "🛡️",
              title: "Doğrulanmış İşletmeler",
              text: "Her üye işletmenin vergi kaydı, yetki belgesi ve fiziki adresi platform ekibince doğrulanır. Kime güveneceğinizi düşünmenize gerek kalmaz.",
            },
            {
              icon: "🎓",
              title: "Prosedür Sertifikası",
              text: "Sertifikalı işletmeler Eminevim, Katılımevim gibi firmaların teslimat, ekspertiz ve evrak prosedürlerine hakimdir; süreç uzamaz, mağduriyet yaşanmaz.",
            },
            {
              icon: "⭐",
              title: "Gerçek Müşteri Puanları",
              text: "Yalnızca teslimatını tamamlamış müşteriler yorum yapabilir. İşletmeler yüksek puan için en iyi hizmeti vermek zorundadır.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 p-6">
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Öne çıkan işletmeler */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink-900">Öne Çıkan İşletmeler</h2>
              <p className="mt-1 text-ink-600">En yüksek puanlı doğrulanmış üyelerimiz</p>
            </div>
            <Link href="/isletmeler" className="text-sm font-semibold text-brand-700 hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((b) => (
              <BusinessCard key={b.slug} business={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Kampanyalar */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-ink-900">Güncel Kampanyalar</h2>
            <p className="mt-1 text-ink-600">
              Tasarruf finansman firmalarının fırsatlarını tek yerden takip edin
            </p>
          </div>
          <Link href="/kampanyalar" className="text-sm font-semibold text-brand-700 hover:underline">
            Tüm Kampanyalar →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {latestCampaigns.map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}
        </div>
      </section>

      {/* İşletme CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl bg-brand-800 px-8 py-12 text-center text-white md:px-16">
          <h2 className="text-3xl font-bold">Galeri veya emlak ofisi mi işletiyorsunuz?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-100">
            Türkiye'de 2 milyondan fazla tasarruf finansman müşterisi var ve her ay
            binlercesi teslimat almaya hak kazanıyor. Bu hazır müşteri kitlesine
            ulaşın, prosedür sertifikanızı alın, puanınızla öne çıkın.
          </p>
          <Link
            href="/uyelik"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 transition-colors hover:bg-brand-50"
          >
            Üyelik Planlarını İncele
          </Link>
        </div>
      </section>
    </>
  );
}
