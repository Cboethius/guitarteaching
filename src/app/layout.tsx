import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/SkipLink";
import { generateSiteMetadata, getJsonLdScript, getServerLocale } from "@/lib/server-locale";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return generateSiteMetadata();
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f6f1",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const jsonLd = await getJsonLdScript();

  return (
    <html lang={locale} className={`${dmSans.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <Providers initialLocale={locale}>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1 scroll-mt-24">
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
