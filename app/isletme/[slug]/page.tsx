import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  businesses,
  getBusiness,
  getBusinessReviews,
  getCompany,
} from "@/lib/data";
import RatingStars from "@/components/RatingStars";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  return { title: business ? `${business.name} — Bulevim` : "İşletme" };
}

const criteriaLabels: Record<string, string> = {
  guvenilirlik: "Güvenilirlik",
  fiyatSeffafligi: "Fiyat Şeffaflığı",
  surecBilgisi: "Prosedür Bilgisi",
  iletisim: "İletişim",
};

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const businessReviews = getBusinessReviews(slug);
  const criteriaAvg = Object.keys(criteriaLabels).map((key) => {
    const values = businessReviews.map(
      (r) => r.criteria[key as keyof typeof r.criteria]
    );
    return {
      key,
      label: criteriaLabels[key],
      avg: values.length
        ? values.reduce((a, b) => a + b, 0) / values.length
        : 0,
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/isletmeler" className="text-sm text-brand-700 hover:underline">
        ← Tüm işletmeler
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        {/* Ana içerik */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-ink-900">{business.name}</h1>
              <p className="mt-1 text-ink-600">
                {business.district}, {business.city} ·{" "}
                {business.type === "galeri" ? "Oto Galeri" : "Emlak Ofisi"}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2">
              <span className="text-2xl font-extrabold text-ink-900">
                {business.rating.toFixed(1)}
              </span>
              <div>
                <RatingStars rating={business.rating} />
                <p className="text-xs text-slate-500">{business.reviewCount} yorum</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {business.verified && (
              <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">
                ✓ Platform Doğrulamalı
              </span>
            )}
            {business.certified && (
              <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
                🎓 Elbirliği Prosedür Sertifikalı
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
              {business.completedDeliveries} tamamlanan teslimat
            </span>
          </div>

          <p className="mt-6 text-ink-600">{business.description}</p>

          <h2 className="mt-8 text-xl font-bold text-ink-900">Hizmetler</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {business.services.map((s) => (
              <li
                key={s}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink-600"
              >
                ✓ {s}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-bold text-ink-900">
            Müşteri Yorumları ({businessReviews.length})
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Yorumlar yalnızca teslimatını bu işletme üzerinden tamamlamış
            müşterilerden alınır ve platform ekibince doğrulanır.
          </p>
          <div className="mt-4 space-y-4">
            {businessReviews.length === 0 && (
              <p className="rounded-xl bg-slate-50 p-6 text-sm text-ink-600">
                Bu işletme için henüz doğrulanmış yorum yok.
              </p>
            )}
            {businessReviews.map((r) => (
              <article key={r.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-800">
                      {r.author[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{r.author}</p>
                      <p className="text-xs text-brand-700">{r.purchase}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <RatingStars rating={r.rating} />
                    <p className="text-xs text-slate-400">
                      {new Date(r.date).toLocaleDateString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-600">{r.comment}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Yan panel */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-ink-900">Puan Detayı</h3>
            <div className="mt-4 space-y-3">
              {criteriaAvg.map((c) => (
                <div key={c.key}>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-600">{c.label}</span>
                    <span className="font-semibold text-ink-900">
                      {c.avg ? c.avg.toFixed(1) : "—"}
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-brand-600"
                      style={{ width: `${(c.avg / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-ink-900">Anlaşmalı Finansman Firmaları</h3>
            <ul className="mt-3 space-y-2">
              {business.partnerCompanies.map((id) => {
                const c = getCompany(id);
                return (
                  <li
                    key={id}
                    className="rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-ink-900"
                  >
                    {c?.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-800 p-5 text-white">
            <h3 className="font-semibold">Bu işletmeyle çalışmak ister misiniz?</h3>
            <p className="mt-2 text-sm text-brand-100">
              Teslimat bilgilerinizi paylaşın, işletme 24 saat içinde sizi arasın.
            </p>
            <Link
              href={`/teklif-al?isletme=${business.slug}`}
              className="mt-4 block rounded-xl bg-white py-2.5 text-center font-semibold text-brand-800 transition-colors hover:bg-brand-50"
            >
              Ücretsiz Teklif Al
            </Link>
            <p className="mt-3 text-center text-xs text-brand-200">
              📞 {business.phone}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
