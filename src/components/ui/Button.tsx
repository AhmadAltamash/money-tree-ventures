import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 py-2 transition duration-300 ease-base " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand " +
  "disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand text-brand-foreground hover:opacity-90",
  secondary: "border border-border bg-surface text-foreground hover:bg-foreground/5",
  ghost: "text-foreground hover:bg-foreground/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "button-md",
  sm: "button-sm",
};

export function getButtonClasses({ variant = "primary", size = "md", className }: ButtonStyleOptions) {
  return joinClasses(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type ButtonProps = ButtonStyleOptions & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, className, type = "button", ...buttonProps }: ButtonProps) {
  return <button type={type} className={getButtonClasses({ variant, size, className })} {...buttonProps} />;
}

type ButtonLinkProps = ButtonStyleOptions & {
  href: string;
  children: ReactNode;
  onClick?: () => void;
};

// Use this when the button should go to another page.
export function ButtonLink({ href, children, variant, size, className, onClick }: ButtonLinkProps) {
  return (
    <Link href={href} onClick={onClick} className={getButtonClasses({ variant, size, className })}>
      {children}
    </Link>
  );
}
