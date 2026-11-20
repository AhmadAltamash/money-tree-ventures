import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { refundPolicy } from "@/content/legal/refund-policy";

export const metadata: Metadata = {
  title: refundPolicy.title,
  description: refundPolicy.description,
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return <LegalPage document={refundPolicy} />;
}
