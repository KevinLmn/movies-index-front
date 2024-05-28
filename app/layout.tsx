import type { Metadata } from "next";
import { Crimson_Text, Inter, Taviraj } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const crimson = Crimson_Text({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const taviraj = Taviraj({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Indexation de films avec Meilisearch",
  description:
    "Projet d'implementations de meilisearch sur un volume conséquent de films, par Kevin Lemniai ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
