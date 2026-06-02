import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports Admin - ExpressAir Cargo System",
  description: "Halaman reports admin untuk melihat laporandata pengiriman cargo udara.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}