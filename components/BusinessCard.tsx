import Link from "next/link";
import { Business } from "@/lib/types";
import { getCompany } from "@/lib/data";
import RatingStars from "./RatingStars";

export default function BusinessCard({ business }: { business: Business }) {
  const featured = business.plan !== "standart";
  return (
    <Link
      href={`/isletme/${business.slug}`}
      className={`group relative flex flex-col rounded-2xl border bg-white p-5 transition-shadow hover:shadow-lg ${
        featured ? "border-brand-200 ring-1 ring-brand-100" : "border-slate-200"
      }`}
    >
      {featured && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">
          Öne Çıkan
        </span>
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-ink-900 group-hover:text-brand-700">
            {business.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-600">
            {business.district}, {business.city} ·{" "}
            {business.type === "galeri" ? "Oto Galeri" : "Emlak Ofisi"}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-lg px-2 py-1 text-xs font-medium ${
            business.type === "galeri"
              ? "bg-sky-50 text-sky-700"
              : "bg-orange-50 text-orange-700"
          }`}
        >
          {business.type === "galeri" ? "Araç" : "Konut / İşyeri"}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <RatingStars rating={business.rating} />
        <span className="text-sm font-semibold text-ink-900">{business.rating.toFixed(1)}</span>
        <span className="text-sm text-slate-400">({business.reviewCount} yorum)</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {business.verified && (
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
            ✓ Doğrulanmış
          </span>
        )}
        {business.certified && (
          <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
            🎓 Prosedür Sertifikalı
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-ink-600">{business.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
        {business.partnerCompanies.map((id) => (
          <span
            key={id}
            className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
          >
            {getCompany(id)?.name}
          </span>
        ))}
      </div>
    </Link>
  );
}
