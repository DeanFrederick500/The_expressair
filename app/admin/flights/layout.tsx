import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flights Admin - ExpressAir Cargo System",
  description: "Halaman flights admin untuk mengelola data penerbangan.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}