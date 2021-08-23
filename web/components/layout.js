import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const Layout = ({ children, title, description }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const [hoveredMenuItem, setHoveredMenuItem] = useState("");

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
    const handleRouteChangeComplete = () => {
      setMenuVisible(false);
      setMenuOpen(false);
    };
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <div>
      <Head>
        <title>{title || "Director Jeremy Miller"}</title>
        <link rel="stylesheet" href="https://use.typekit.net/apl0yxr.css" />
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
          content="https://directorjmills.vercel.app/og-image.jpg"
        />
      </Head>

      <div className="absolute w-full top-12 lg:top-16">
        <div className="relative z-50 lg:container mx-auto flex justify-end items-center overflow-visible">
          <button
            className="w-12 h-8 focus:outline-none absolute top-0 lg:top-4 right-4 lg:right-0"
            onClick={() => toggleMenu(!menuOpen)}
            aria-label="Close menu"
          >
            <span
              className={`${menuOpen ? "opacity-100" : "opacity-0"} ${
                menuVisible ? "absolute" : "hidden"
              } top-0 right-0 transform transition-all ease-in delay-500 duration-300`}
              style={{ width: "48px", height: "32px" }}
            >
              <Image
                alt="Close menu"
                className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                src={`/images/menu-close.svg`}
                layout="fill"
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        className={`${menuOpen ? "translate-x-0" : "translate-x-4 opacity-0"} ${
          menuVisible ? "fixed" : "hidden"
        } inset-0 bg-white transform transition-all ease-in duration-300 z-40 text-right flex flex-col justify-center items-center`}
      >
        <Link href="/">
          <a
            className={`${
              !hoveredMenuItem || hoveredMenuItem === "/"
                ? "text-black"
                : "text-gray-800"
            } font-extrabold relative group py-6 uppercase text-bold text-2xl md:text-4xl transition-all duration-700 w-64 text-center`}
            onMouseEnter={() => setHoveredMenuItem("/")}
            onMouseLeave={() => setHoveredMenuItem("")}
          >
            <span className="relative z-10">Work</span>
            <span
              className={`${
                hoveredMenuItem === "/" ? "w-full" : "w-0"
              } transition-all duration-500 absolute z-0 left-0 right-0 bg-gray-900`}
              style={{ bottom: "calc(50% - 1px)", height: "2px" }}
            ></span>
          </a>
        </Link>
        <Link href="/contact">
          <a
            className={`${
              !hoveredMenuItem || hoveredMenuItem === "/contact"
                ? "text-black"
                : "text-gray-800"
            } font-extrabold relative group py-6 uppercase text-bold text-2xl md:text-4xl transition-all duration-700 w-64 text-center`}
            onMouseEnter={() => setHoveredMenuItem("/contact")}
            onMouseLeave={() => setHoveredMenuItem("")}
          >
            <span className="relative z-10">Contact</span>
            <span
              className={`${
                hoveredMenuItem === "/contact" ? "w-full" : "w-0"
              } transition-all duration-500 absolute z-0 left-0 right-0 bg-gray-900`}
              style={{ bottom: "calc(50% - 1px)", height: "2px" }}
            ></span>
          </a>
        </Link>
      </nav>

      <header className="relative text-center py-8 container mx-auto">
        <div>
          <p className="uppercase font-extrabold text-3xl">
            <Link href={`/`}>
              <a>Director</a>
            </Link>
          </p>
          <p className="uppercase font-light text-3xl">
            <Link href={`/`}>
              <a>Jeremy Miller</a>
            </Link>
          </p>
        </div>
        <div className="absolute right-0 top-12 flex justify-end items-center">
          <div className="relative lg:ml-8 lg:mr-0">
            <button
              className="w-12 h-8 focus:outline-none relative"
              onClick={() => toggleMenu(!menuOpen)}
              aria-label="Open menu"
            >
              <span
                className={`${!menuOpen ? "opacity-100" : "opacity-0"} ${
                  !menuVisible ? "absolute" : "hidden"
                } top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300`}
              >
                <Image
                  alt="Open menu"
                  className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                  src={`/images/menu.svg`}
                  layout="fill"
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="py-8 text-center">
        &copy; Jeremy Miller {new Date().getFullYear()}
      </footer>
    </div>
  );
};
export default Layout;
