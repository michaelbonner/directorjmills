import { clsx } from "clsx";

export const globalStyles = {
  h1: clsx(
    "text-5xl font-semibold tracking-[-0.04em] text-balance uppercase",
    "sm:text-6xl lg:text-7xl xl:text-8xl",
  ),
  h2: clsx(
    "text-4xl font-semibold tracking-[-0.035em] text-balance uppercase",
    "lg:text-5xl",
  ),
  h3: clsx(
    "text-2xl font-semibold tracking-tight text-balance uppercase",
    "lg:text-3xl",
  ),
  eyebrow: "text-sm font-medium tracking-[0.12em] uppercase text-neutral-600",
  container: "mx-auto max-w-7xl px-5 sm:px-8",
  textLink:
    "inline-flex min-h-12 items-center gap-5 border-b border-current py-2 text-base font-medium hover:opacity-60",
};
