import type { ReactNode } from "react";
import { joinClasses } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// Keeps page content centered with the same side padding on every screen size.
export function Container({ children, className }: ContainerProps) {
  return <div className={joinClasses("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
