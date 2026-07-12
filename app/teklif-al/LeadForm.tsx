"use client";

import { useState } from "react";
import Link from "next/link";
import { businesses, financeCompanies, getBusiness } from "@/lib/data";

export default function LeadForm({
  preselectedBusiness,
  mode,
}: {
  preselectedBusiness?: string;
  mode?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const isBusinessApplication = mode === "isletme";
  const preselected = preselectedBusiness
    ? getBusiness(preselectedBusiness)
    : undefined;

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 text-2xl font-bold text-ink-900">
          Talebiniz alındı!
        </h1>
        <p className="mt-3 text-ink-600">
          {isBusinessApplication
            ? "Üyelik danışmanımız 24 saat içinde sizinle iletişime geçecek."
            : "Kriterlerinize uygun doğrulanmış işletmeler 24 saat içinde sizi arayacak. Görüşme sonrası deneyiminizi puanlamayı unutmayın!"}
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">
        {isBusinessApplication ? "İşletme Başvurusu" : "Ücretsiz Teklif Al"}
      </h1>
      <p className="mt-2 text-ink-600">
        {isBusinessApplication
          ? "Galeri veya emlak ofisinizi platforma ekleyin, teslimat müşterilerine ulaşın."
          : preselected
            ? `${preselected.name} işletmesinden teklif almak için bilgilerinizi bırakın.`
            : "Bilgilerinizi bırakın, bölgenizdeki doğrulanmış işletmeler 24 saat içinde sizi arasın. Hizmet müşteriler için tamamen ücretsizdir."}
      </p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-ink-900">
            {isBusinessApplication ? "İşletme adı" : "Ad Soyad"}
          </label>
          <input
            required
            type="text"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
            placeholder={isBusinessApplication ? "Örn. Güven Oto Galeri" : "Adınız Soyadınız"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900">Telefon</label>
          <input
            required
            type="tel"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
            placeholder="05xx xxx xx xx"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-900">Şehir</label>
          <input
            required
            type="text"
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
            placeholder="Örn. İstanbul"
          />
        </div>

        {isBusinessApplication ? (
          <div>
            <label className="block text-sm font-medium text-ink-900">İşletme tipi</label>
            <select
              required
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
            >
              <option value="">Seçiniz</option>
              <option value="galeri">Oto Galeri</option>
              <option value="emlak">Emlak Ofisi</option>
            </select>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-ink-900">
                Finansman firmanız
              </label>
              <select
                required
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
              >
                <option value="">Seçiniz</option>
                {financeCompanies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                <option value="diger">Diğer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-900">
                Teslimat türü
              </label>
              <select
                required
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
              >
                <option value="">Seçiniz</option>
                <option value="arac">Araç</option>
                <option value="ev">Konut</option>
                <option value="isyeri">İşyeri</option>
              </select>
            </div>
            {preselected && (
              <div>
                <label className="block text-sm font-medium text-ink-900">
                  Seçilen işletme
                </label>
                <select
                  defaultValue={preselected.slug}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
                >
                  {businesses.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name} — {b.city}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-ink-900">
            Notunuz (isteğe bağlı)
          </label>
          <textarea
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
            placeholder={
              isBusinessApplication
                ? "İşletmeniz ve deneyiminiz hakkında kısa bilgi"
                : "Örn. Teslimat tutarım 1.5 milyon TL, SUV arıyorum."
            }
          />
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-500">
          <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-600" />
          Kişisel verilerimin talebimin karşılanması amacıyla ilgili işletmelerle
          paylaşılmasına onay veriyorum (KVKK Aydınlatma Metni).
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-brand-600 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {isBusinessApplication ? "Başvuruyu Gönder" : "Teklif Talebini Gönder"}
        </button>
      </form>
    </div>
  );
}
