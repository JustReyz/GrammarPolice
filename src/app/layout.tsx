import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grammar Police",
  description:
    "Simulasi Percakapan • Evaluasi Kontekstual • Adaptive Learning berbasis AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
