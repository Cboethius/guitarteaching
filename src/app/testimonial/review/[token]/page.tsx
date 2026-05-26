import type { Metadata } from "next";
import { TestimonialReviewPage } from "@/components/TestimonialReviewPage";

export const metadata: Metadata = {
  title: "Testimonial bestätigen",
  robots: { index: false, follow: false },
};

export default function TestimonialReviewRoute() {
  return <TestimonialReviewPage />;
}
