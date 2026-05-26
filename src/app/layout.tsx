import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://guitarteaching.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Gitarrenunterricht Zürich, ${site.name}, ${site.teacher}`,
    template: `%s, ${site.name}`,
  },
  description:
    "Gitarrenunterricht in Zürich mit Christian Boethius. Probelektionen und Abos — Zoom, neutraler Ort oder bei Ihnen zu Hause.",
  openGraph: {
    title: `Gitarrenunterricht Zürich, ${site.name}`,
    description: `Einzelunterricht Gitarre mit ${site.teacher} in Zürich.`,
    locale: "de_CH",
    type: "website",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f6f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${dmSans.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Providers>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1 scroll-mt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
