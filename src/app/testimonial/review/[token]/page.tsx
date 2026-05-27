import type { Metadata } from "next";
import { TestimonialReviewPage } from "@/components/TestimonialReviewPage";

export const metadata: Metadata = {
  title: "Testimonial bestätigen",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function TestimonialReviewRoute({ params }: PageProps) {
  const { token } = await params;
  return <TestimonialReviewPage token={token} />;
}
