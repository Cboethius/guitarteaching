import type { Metadata } from "next";
import { AdminTestimonialsPage } from "@/components/AdminTestimonialsPage";

export const metadata: Metadata = {
  title: "Testimonials verwalten",
  robots: { index: false, follow: false },
};

export default function AdminTestimonialsRoute() {
  return <AdminTestimonialsPage />;
}
