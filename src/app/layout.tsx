import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Gitarrenunterricht Zürich, ${site.name}, ${site.teacher}`,
  description:
    "Privater Gitarrenunterricht in Zürich. Online, neutraler Ort oder bei Ihnen zu Hause. Buchen Sie eine Lektion.",
  openGraph: {
    title: `Gitarrenunterricht Zürich, ${site.name}`,
    description: `Einzelunterricht Gitarre mit ${site.teacher} in Zürich.`,
  },
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
