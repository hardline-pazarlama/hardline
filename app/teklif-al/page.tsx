import type { Metadata } from "next";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Teklif Al — TeslimGüven",
};

export default async function LeadPage({
  searchParams,
}: {
  searchParams: Promise<{ isletme?: string; tip?: string }>;
}) {
  const { isletme, tip } = await searchParams;
  return <LeadForm preselectedBusiness={isletme} mode={tip} />;
}
