import type { Metadata } from "next";
import DirectoryClient from "./DirectoryClient";

export const metadata: Metadata = {
  title: "Galeriler & Emlakçılar — Bulevim",
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ tip?: string }>;
}) {
  const { tip } = await searchParams;
  return <DirectoryClient initialType={tip} />;
}
