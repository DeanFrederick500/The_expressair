import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flights Operator - ExpressAir Cargo System",
  description: "Halaman dashboard operator untuk mengelola data penerbangan cargo udara.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}