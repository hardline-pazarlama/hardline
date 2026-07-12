import { Campaign } from "@/lib/types";
import { getCompany } from "@/lib/data";

const categoryLabels: Record<Campaign["category"], string> = {
  ev: "Konut",
  arac: "Araç",
  isyeri: "İşyeri",
};

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  const company = getCompany(campaign.companyId);
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-700">{company?.name}</span>
        {campaign.highlight && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            {campaign.highlight}
          </span>
        )}
      </div>
      <h3 className="mt-2 font-semibold text-ink-900">{campaign.title}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-600">{campaign.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
          {categoryLabels[campaign.category]}
        </span>
        <span>
          Son geçerlilik:{" "}
          {new Date(campaign.validUntil).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </article>
  );
}
