import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipments Operator - ExpressAir Cargo System",
  description: "Halaman dashboard operator untuk mengelola data pengiriman cargo udara.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}