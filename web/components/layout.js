"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getMenuItems } from "../functions/getMenuItems";
import urlForSanitySource from "../lib/urlForSanitySource";

const Layout = ({
  children,
  title,
  description,
  heroImageUrl,
  heroVideoId,
  isDesktop,
  isStillsPageEnabled,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const pathname = usePathname();
  const [hoveredMenuItem, setHoveredMenuItem] = useState("");
  const [headerStyles, setHeaderStyles] = useState({});
  const [showHero, setShowHero] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(!menuOpen);
      setTimeout(() => {
        setMenuVisible(!menuOpen);
      }, 100);
    } else {
      setMenuVisible(!menuOpen);
      setTimeout(() => {
        setMenuOpen(!menuOpen);
      }, 100);
    }
  };

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
    setMenuVisible(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if ((heroImageUrl || heroVideoId) && isDesktop) {
      setShowHero(true);
      setHeaderStyles({
        backgroundImage: heroImageUrl
          ? `url(${urlForSanitySource(heroImageUrl).width(1400)})`
          : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "60vh",
      });
    }
  }, [heroVideoId, heroImageUrl, isDesktop]);

  useEffect(() => {
    setTimeout(() => {
      setVideoPlaying(true);
    }, 1500);
  }, []);

  return (
    <div
      className={`${isDesktop && heroVideoId ? "opacity-0" : null} ${isDesktop && heroVideoId && videoPlaying ? "bpd-fade-in" : null
        }`}
    >
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

      <div className="absolute w-full top-12 lg:top-16">
        <div className="relative z-50 lg:container mx-auto flex justify-end items-center overflow-visible">
          <button
            className="w-12 h-8 focus:outline-hidden absolute top-0 lg:top-4 right-4 lg:right-0"
            onClick={() => toggleMenu(!menuOpen)}
            aria-label="Close menu"
          >
            <span
              className={`${menuOpen ? "opacity-100" : "opacity-0"} ${menuVisible ? "absolute" : "hidden"
                } top-0 right-0 transform transition-all ease-in delay-500 duration-300`}
              style={{ width: "48px", height: "32px" }}
            >
              <Image
                alt="Close menu"
                className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                src={`/images/menu-close.svg`}
                fill
                sizes="100vw"
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        className={`${menuOpen ? "translate-x-0" : "translate-x-4 opacity-0"} ${menuVisible ? "fixed" : "hidden"
          } inset-0 bg-white/90 backdrop-blur-lg transform transition-all ease-in duration-300 z-40 text-right flex flex-col justify-center items-center`}
      >
        {getMenuItems({ isStillsPageEnabled }).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${!hoveredMenuItem || hoveredMenuItem === item.href
              ? "text-black"
              : "text-gray-800"
              } ${item.hideOnMobile && "hidden lg:inline-block"
              } font-extrabold relative group py-6 uppercase text-bold text-2xl md:text-4xl transition-all duration-700 w-64 text-center`}
            onMouseEnter={() => setHoveredMenuItem(item.href)}
            onMouseLeave={() => setHoveredMenuItem("")}
          >
            <span className="relative z-10">{item.title}</span>
            <span
              className={`${hoveredMenuItem === item.href ? "w-full" : "w-0"
                } transition-all duration-500 absolute z-0 left-0 right-0 bg-gray-900`}
              style={{ bottom: "calc(50% - 1px)", height: "2px" }}
            ></span>
          </Link>
        ))}
      </nav>

      <header
        className={`relative ${heroVideoId
          ? `lg:bg-linear-to-b from-gray-400 to-white via-gray-100 lg:bg-opacity-25`
          : null
          }`}
        style={headerStyles}
      >
        {isDesktop && heroVideoId && (
          <div
            className={`bpd-hero-foreground absolute z-0 h-full w-full inset-0 ${videoPlaying ? "opacity-100" : "opacity-0"
              }`}
          >
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
              title="Ravens Film Works"
              src={`https://player.vimeo.com/video/${heroVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
              width={`100%`}
            />
          </div>
        )}
        <div className="relative text-center py-8 container mx-auto z-10">
          <div>
            <p
              className={`uppercase font-extrabold text-3xl ${showHero ? "text-white" : null
                }`}
            >
              <Link href={`/`}>Director</Link>
            </p>
            <p
              className={`uppercase font-light text-3xl ${showHero ? "text-white" : null
                }`}
            >
              <Link href={`/`}>Jeremy Miller</Link>
            </p>
          </div>
          <div className="absolute right-4 md:right-0 top-12 flex justify-end items-center">
            <div className="relative lg:ml-8 lg:mr-0">
              <button
                className="w-12 h-8 focus:outline-hidden relative"
                onClick={() => toggleMenu(!menuOpen)}
                aria-label="Open menu"
              >
                <span
                  className={`${!menuOpen ? "opacity-100" : "opacity-0"} ${!menuVisible ? "absolute" : "hidden"
                    } top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300`}
                >
                  <Image
                    alt="Open menu"
                    className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                    src={
                      showHero ? `/images/menu-white.svg` : `/images/menu.svg`
                    }
                    priority={true}
                    fill
                    sizes="100vw"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="relative z-10 bg-white w-full">{children}</main>
      <footer className="relative z-10 py-8 text-center bg-white">
        <nav className="container mx-auto flex space-x-4 justify-center py-8">
          <Link href="/" className="font-bold underline uppercase">
            Home
          </Link>
          <Link
            href="/work"
            className="hidden lg:inline-block font-bold underline uppercase"
          >
            Work
          </Link>
          {isStillsPageEnabled && (
            <Link
              href="/stills"
              className="hidden lg:inline-block font-bold underline uppercase"
            >
              Stills
            </Link>
          )}
          <Link href="/contact" className="font-bold underline uppercase">
            Contact
          </Link>
        </nav>
        &copy; Jeremy Miller {new Date().getFullYear()}
      </footer>
    </div>
  );
};
export default Layout;
