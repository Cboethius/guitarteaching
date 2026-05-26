import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Über mich, ${site.name}`,
  description: `Christian Boethius, Gitarrenunterricht in Zürich. Wer ich bin und wie ich unterrichte.`,
};

export default function AboutRoute() {
  return <AboutPage />;
}
