import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Mera account",
  robots: { index: false, follow: false },
};

// Each page below also checks the login itself. This layout only draws the shared frame.
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-24 pb-20">
      <Container className="flex flex-col gap-8">
        <DashboardNav />
        {children}
      </Container>
    </div>
  );
}
