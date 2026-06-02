import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ExpressAir Cargo System",
  description: "Halaman login untuk mengakses dashboard admin atau operator ExpressAir Cargo System.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}