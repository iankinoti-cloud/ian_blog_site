import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-block rounded-lg px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors";
  const variants = {
    primary: "bg-[var(--brown)] text-[var(--cream)] hover:bg-[var(--brown-dark)]",
    secondary: "border border-[var(--tan)] text-[var(--brown)] bg-transparent hover:bg-[var(--parchment)]",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
