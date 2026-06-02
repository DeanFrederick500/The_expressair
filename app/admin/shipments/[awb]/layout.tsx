import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Shipments Admin - ExpressAir Cargo System",
  description: "Halaman Detail Shipments admin untuk melihat detail shipments.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}