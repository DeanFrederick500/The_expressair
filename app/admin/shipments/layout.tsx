import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipments Admin - ExpressAir Cargo System",
  description: "Halaman shipments admin untuk mengelola data pengiriman cargo udara.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}