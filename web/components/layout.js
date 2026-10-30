"use client";

import { clsx } from "clsx";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getMenuItems } from "../functions/getMenuItems";
import urlForSanitySource from "../lib/urlForSanitySource";
import { globalStyles } from "../styles/globalStyles";

const Layout = ({
  children,
  title,
  description,
  heroContent,
  heroImageUrl,
  heroVideoId,
  isStillsPageEnabled,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [videoPlaying, setVideoPlaying] = useState(false);

  const hasHero = Boolean(heroContent || heroImageUrl || heroVideoId);
  const menuItems = getMenuItems({ isStillsPageEnabled });
  const isCurrent = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }

    return () => {
      document.body.style.overflow = "inherit";
    };
  }, [menuOpen]);

  useEffect(() => {
    // Close menu when pathname changes (route navigation)
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // The mobile menu is hidden at lg, so close it there to release the scroll lock
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (event) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const isLightHeader = hasHero && !menuOpen;

  return (
    <div className="flex min-h-svh flex-col">
      <Head>
        <title>{title || "Director Jeremy Miller"}</title>
        <link
          rel="preload"
          href="https://player.vimeo.com/api/player.js"
          as="script"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content={title || "Director Jeremy Miller"} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://jeremymillerdirector.com/og-image.jpg"
        />
        <meta name="description" content={description} />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://player.vimeo.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://f.vimeocdn.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://i.vimeocdn.com"
          crossOrigin="true"
        />
      </Head>

      <header
        className={clsx(
          "z-50 w-full",
          hasHero ? "absolute inset-x-0 top-0" : "relative",
          menuOpen && "fixed! bg-[#fafaf9]",
          isLightHeader ? "text-white" : "text-neutral-950",
        )}
      >
        <div
          className={clsx(
            globalStyles.container,
            "flex items-center justify-between gap-8 py-5 lg:py-7",
          )}
        >
          <Link href="/" aria-label="Homepage" className="group leading-none">
            <span className="block text-2xl font-semibold tracking-[-0.03em] uppercase lg:text-3xl">
              Jeremy Miller
            </span>
            <span
              className={clsx(
                "mt-1.5 block text-xs font-medium tracking-[0.24em] uppercase",
                isLightHeader ? "text-white/70" : "text-neutral-500",
              )}
            >
              Director
            </span>
          </Link>

          <nav aria-label="Main navigation">
            <div className="hidden items-center gap-8 text-sm font-medium tracking-[0.08em] uppercase lg:flex">
              {menuItems
                .filter((item) => item.href !== "/" && item.href !== "/contact")
                .map((item) => (
                  <Link
                    className={clsx(
                      "border-b py-2 transition-colors",
                      isCurrent(item.href)
                        ? "border-current"
                        : "border-transparent hover:border-current",
                    )}
                    href={item.href}
                    key={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                ))}
              <Link
                className={clsx(
                  "border px-5 py-3 transition-colors",
                  isLightHeader
                    ? "border-white hover:bg-white hover:text-neutral-950"
                    : "border-neutral-950 hover:bg-neutral-950 hover:text-white",
                )}
                href="/contact"
                aria-current={isCurrent("/contact") ? "page" : undefined}
              >
                Contact
              </Link>
            </div>

            <button
              type="button"
              className="flex min-h-12 items-center gap-3 border-b border-current text-sm font-medium tracking-[0.08em] uppercase lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
              <span className="text-xl leading-none" aria-hidden="true">
                {menuOpen ? "×" : "+"}
              </span>
            </button>
          </nav>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="h-[calc(100svh-88px)] overflow-y-auto border-t border-neutral-200 bg-[#fafaf9] px-5 py-5 sm:px-8 lg:hidden"
          >
            <div className="flex flex-col">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="border-b border-neutral-200 py-5 text-3xl font-semibold tracking-[-0.03em] uppercase"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {hasHero && (
        <section className="relative isolate min-h-[560px] w-full overflow-hidden bg-neutral-950 text-white sm:min-h-[640px] lg:min-h-[min(820px,92svh)]">
          {heroImageUrl && (
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{
                backgroundImage: `url(${urlForSanitySource(heroImageUrl).width(1800)})`,
              }}
            />
          )}
          {heroVideoId && (
            <div
              className={clsx(
                "absolute inset-0 -z-10 overflow-hidden transition-opacity duration-1000 [container-type:size]",
                videoPlaying ? "opacity-100" : "opacity-0",
              )}
            >
              {/*
                Size the 16:9 player to cover the hero like object-cover.
                The reel is letterboxed (~2.4:1 inside a 16:9 frame), so
                cover using the picture's ratio to push the bars off-screen.
              */}
              <div className="absolute top-1/2 left-1/2 h-[max(56.25cqw,135cqh)] w-[max(100cqw,240cqh)] -translate-x-1/2 -translate-y-1/2">
                <ReactPlayer
                  allow="autoplay; fullscreen; picture-in-picture"
                  controls={false}
                  frameBorder="0"
                  height={`100%`}
                  loop={true}
                  muted={true}
                  playing={true}
                  playsinline={true}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                  }}
                  onPlay={() => setVideoPlaying(true)}
                  title="Jeremy Miller director reel"
                  src={`https://player.vimeo.com/video/${heroVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
                  width={`100%`}
                />
              </div>
            </div>
          )}
          <div className="flex min-h-[560px] items-end bg-linear-to-t from-neutral-950/85 via-neutral-950/30 to-neutral-950/40 py-16 sm:min-h-[640px] lg:min-h-[min(820px,92svh)] lg:bg-linear-to-r lg:from-neutral-950/80 lg:via-neutral-950/35 lg:to-neutral-950/10 lg:py-20">
            <div className={clsx(globalStyles.container, "w-full")}>
              {heroContent}
            </div>
          </div>
        </section>
      )}

      <main className="relative z-10 w-full flex-1">{children}</main>

      <footer className="bg-[#eeece8] pt-16 pb-8 lg:pt-20">
        <div
          className={clsx(
            globalStyles.container,
            "grid gap-12 lg:grid-cols-12 lg:gap-10",
          )}
        >
          <div className="lg:col-span-6">
            <Link href="/" aria-label="Homepage" className="inline-block">
              <span className="block text-3xl font-semibold tracking-[-0.03em] uppercase lg:text-4xl">
                Jeremy Miller
              </span>
            </Link>
            <p className="mt-6 max-w-[36ch] text-base/7 text-neutral-600">
              Commercial and narrative director based in Salt Lake City, Utah.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <p className={clsx(globalStyles.eyebrow, "mb-5")}>Explore</p>
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base/7 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-3">
            <p className={clsx(globalStyles.eyebrow, "mb-5")}>Work together</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-b border-neutral-950 pb-1 text-base font-medium hover:opacity-60"
            >
              Representation &amp; contact
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className={clsx(globalStyles.container, "mt-16")}>
          <div className="flex flex-col gap-3 border-t border-neutral-300 pt-6 text-sm text-neutral-600 sm:flex-row sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Jeremy Miller</p>
            <a className="hover:underline" href="https://bootpackdigital.com/">
              Web development by Bootpack Digital
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
