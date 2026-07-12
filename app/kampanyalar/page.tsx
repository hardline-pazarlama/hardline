import type { Metadata } from "next";
import { campaigns, financeCompanies } from "@/lib/data";
import CampaignCard from "@/components/CampaignCard";

export const metadata: Metadata = {
  title: "Güncel Kampanyalar — TeslimGüven",
  description:
    "Eminevim, Katılımevim, Fuzul Ev ve Birevim'in güncel ev, araç ve işyeri kampanyalarını tek adresten takip edin.",
};

export default function CampaignsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-ink-900">Güncel Kampanyalar</h1>
      <p className="mt-2 max-w-2xl text-ink-600">
        Tasarruf finansman firmalarının kampanyalarını tek yerden takip edin,
        fırsatı yakalayın, çevrenizi bilgilendirin. Kampanya bilgileri ilgili
        firmaların resmî duyurularından derlenir ve düzenli güncellenir.
      </p>

      {financeCompanies.map((company) => {
        const companyCampaigns = campaigns.filter((c) => c.companyId === company.id);
        if (companyCampaigns.length === 0) return null;
        return (
          <section key={company.id} className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-ink-900">{company.name}</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                {companyCampaigns.length} kampanya
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-600">{company.shortDescription}</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companyCampaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <strong>Not:</strong> TeslimGüven bağımsız bir platformdur. Kampanya
        koşulları ilgili finansman firmasının resmî kanallarından teyit
        edilmelidir; nihai koşullar firma sözleşmelerinde yer alır.
      </div>
    </div>
  );
}
