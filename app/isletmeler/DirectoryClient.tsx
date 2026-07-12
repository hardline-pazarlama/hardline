"use client";

import { useMemo, useState } from "react";
import { businesses, financeCompanies, sortBusinesses } from "@/lib/data";
import { BusinessType } from "@/lib/types";
import BusinessCard from "@/components/BusinessCard";

const cities = [...new Set(businesses.map((b) => b.city))].sort((a, b) =>
  a.localeCompare(b, "tr")
);

export default function DirectoryClient({
  initialType,
}: {
  initialType?: string;
}) {
  const [type, setType] = useState<BusinessType | "">(
    initialType === "galeri" || initialType === "emlak" ? initialType : ""
  );
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [onlyCertified, setOnlyCertified] = useState(false);

  const results = useMemo(() => {
    const filtered = businesses.filter(
      (b) =>
        (!type || b.type === type) &&
        (!city || b.city === city) &&
        (!company || b.partnerCompanies.includes(company)) &&
        (!onlyCertified || b.certified)
    );
    return sortBusinesses(filtered);
  }, [type, city, company, onlyCertified]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">Galeriler & Emlakçılar</h1>
      <p className="mt-2 text-ink-600">
        Anlaşmalı olduğunuz finansman firmasına ve şehrinize göre doğrulanmış
        işletmeleri filtreleyin.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as BusinessType | "")}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="İşletme tipi"
        >
          <option value="">Tüm İşletmeler</option>
          <option value="galeri">Oto Galeriler</option>
          <option value="emlak">Emlak Ofisleri</option>
        </select>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="Şehir"
        >
          <option value="">Tüm Şehirler</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          aria-label="Finansman firması"
        >
          <option value="">Tüm Finansman Firmaları</option>
          {financeCompanies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-600">
          <input
            type="checkbox"
            checked={onlyCertified}
            onChange={(e) => setOnlyCertified(e.target.checked)}
            className="h-4 w-4 accent-brand-600"
          />
          Sadece prosedür sertifikalılar
        </label>
        <span className="ml-auto text-sm text-slate-500">
          {results.length} işletme bulundu
        </span>
      </div>

      {results.length === 0 ? (
        <div className="mt-16 text-center text-ink-600">
          <p className="text-lg font-medium">Bu kriterlere uygun işletme bulunamadı.</p>
          <p className="mt-1 text-sm">
            Filtreleri genişletmeyi deneyin — her hafta yeni işletmeler katılıyor.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((b) => (
            <BusinessCard key={b.slug} business={b} />
          ))}
        </div>
      )}
    </div>
  );
}
