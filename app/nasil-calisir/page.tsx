import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nasıl Çalışır? — Bulevim",
};

const customerSteps = [
  {
    title: "Teslimat hakkınızı kazanın",
    text: "Eminevim, Katılımevim, Fuzul Ev veya Birevim'deki tarifenizde teslimat sıranız geldiğinde platformumuza gelin.",
  },
  {
    title: "Şehrinizi ve ihtiyacınızı seçin",
    text: "Araç, konut veya işyeri — şehrinize ve anlaşmalı olduğunuz finansman firmasına göre doğrulanmış işletmeleri filtreleyin.",
  },
  {
    title: "Puanlara ve sertifikalara bakın",
    text: "Gerçek müşteri yorumlarını, güvenilirlik ve prosedür bilgisi puanlarını inceleyin. Prosedür sertifikalı işletmeler finansman sürecini sizin kadar iyi bilir.",
  },
  {
    title: "Teklif alın, teslimatınızı tamamlayın",
    text: "Seçtiğiniz işletmeler 24 saat içinde sizi arar. Ekspertiz, evrak ve tapu/noter sürecinde işletme size eşlik eder.",
  },
  {
    title: "Deneyiminizi puanlayın",
    text: "Teslimat sonrası deneyiminizi 4 kriterde puanlayın. Puanınız diğer müşterilere yol gösterir, işletmeleri en iyi hizmete teşvik eder.",
  },
];

const businessSteps = [
  {
    title: "Başvurun ve doğrulanın",
    text: "Vergi kaydınız, yetki belgeniz ve fiziki adresiniz ekibimizce doğrulanır. Sadece gerçek, kayıtlı işletmeler platforma girer.",
  },
  {
    title: "Prosedür sertifikası alın",
    text: "Tasarruf finansman firmalarının teslimat, ekspertiz ve evrak prosedürlerini kapsayan online eğitimi tamamlayın, sertifika rozetinizi kazanın.",
  },
  {
    title: "Talepleri karşılayın",
    text: "Bölgenizdeki teslimat müşterilerinin talepleri panelinize düşer. Hızlı dönün, süreci doğru yönetin.",
  },
  {
    title: "Puanınızla büyüyün",
    text: "Yüksek puan sıralamada üst sıraya taşır, daha fazla talep getirir. Memnun müşteri, yeni müşteri demektir.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">Nasıl Çalışır?</h1>
      <p className="mt-2 max-w-2xl text-ink-600">
        Bulevim, tasarruf finansman (elbirliği) sistemi müşterileri ile bu
        sistemlerin prosedürlerine hakim, doğrulanmış galeri ve emlak
        ofislerini buluşturur.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-bold text-brand-700">Müşteriler için</h2>
          <ol className="mt-4 space-y-4">
            {customerSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink-900">İşletmeler için</h2>
          <ol className="mt-4 space-y-4">
            {businessSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-slate-200 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-600">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href="/uyelik"
            className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            İşletme Üyeliği Başlat
          </Link>
        </section>
      </div>

      <section className="mt-14 rounded-3xl bg-slate-50 p-8">
        <h2 className="text-xl font-bold text-ink-900">Neden puanlama bu kadar önemli?</h2>
        <p className="mt-3 max-w-3xl text-ink-600">
          Elbirliği sisteminde teslimat, müşterinin yıllarca biriktirdiği
          tasarrufun karşılığıdır. Yanlış işletme seçimi; ekspertiz farkı,
          evrak gecikmesi ve hak kaybı demektir. Bulevim'de yorumlar
          yalnızca teslimatını tamamlamış gerçek müşterilerden alınır ve dört
          kritere ayrılır: <strong>güvenilirlik, fiyat şeffaflığı, prosedür
          bilgisi ve iletişim</strong>. Böylece işletmeler yalnızca satış değil,
          sürecin tamamında iyi hizmet için yarışır.
        </p>
      </section>
    </div>
  );
}
