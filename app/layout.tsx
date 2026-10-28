import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// Same typeface as elijahcruzado.com, self hosted by Next.js at build time.
const brand = Bricolage_Grotesque({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ask Elijah · Elijah Cruzado",
  description: "Ask about Elijah Cruzado's product design work, case studies and process.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
