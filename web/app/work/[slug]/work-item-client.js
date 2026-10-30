/* eslint-disable @next/next/no-img-element */
"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiMaximize,
  FiMinimize,
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { ClientOnly } from "../../../components/client-only";
import Layout from "../../../components/layout";
import { WorkGrid } from "../../../components/work-grid";
import useInterval from "../../../hooks/useInterval";
import { useIsomorphicLayoutEffect } from "../../../hooks/useIsomorphicLayoutEffect";
import { useTitledVimeoRef } from "../../../hooks/useTitledVimeoRef";
import urlForSanitySource from "../../../lib/urlForSanitySource";
import { globalStyles } from "../../../styles/globalStyles";

const MORE_WORK_COUNT = 6;

/*
prevent purging of aspect ratio
aspect-w-1  aspect-h-1
aspect-w-2  aspect-h-2
aspect-w-3  aspect-h-3
aspect-w-4  aspect-h-4
aspect-w-5  aspect-h-5
aspect-w-6  aspect-h-6
aspect-w-7  aspect-h-7
aspect-w-8  aspect-h-8
aspect-w-9  aspect-h-9
aspect-w-10 aspect-h-10
aspect-w-11 aspect-h-11
aspect-w-12 aspect-h-12
aspect-w-13 aspect-h-13
aspect-w-14 aspect-h-14
aspect-w-15 aspect-h-15
aspect-w-16 aspect-h-16
*/

export function WorkItemClient({
  isStillsPageEnabled,
  workItem = {},
  workItems = [],
}) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const player = useRef(null);
  const scrubber = useRef(null);
  const [scrubberWidth, setScrubberWidth] = useState(0);
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const [totalPlaySeconds, setTotalPlaySeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [muted, setMuted] = useState(false);

  const checkIfIos = (navigator) => {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  };

  const checkIfIpad = (navigator) => {
    return (
      !["iPhone", "iPod"].includes(navigator.platform) &&
      navigator.userAgent.includes("Mac") &&
      "ontouchend" in document
    );
  };

  const toggleFullScreen = (onOff) => {
    const element = document.querySelector(".bpd-player-container");
    if (onOff) {
      if (screenfull.isEnabled) {
        screenfull.request(element);
      }
      setIsFullscreen(true);
    } else {
      if (screenfull.isEnabled) {
        screenfull.exit();
      }
      setIsFullscreen(false);
    }
  };

  const handleFullScreenChange = () => {
    if (screenfull.isFullscreen) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullScreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullScreenChange);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100);
    }, 1000);
  }, [scrubber]);

  useInterval(
    () => {
      if (player.current) {
        const currentTime = player.current.currentTime;
        if (currentTime !== undefined && totalPlaySeconds > 0) {
          setScrubberPosition((currentTime / totalPlaySeconds) * scrubberWidth);
        }
      }
    },
    isPlaying ? 75 : null,
  );

  useIsomorphicLayoutEffect(() => {
    if (checkIfIos(window.navigator)) {
      setIsIos(true);
    }
    if (checkIfIpad(window.navigator)) {
      setIsIpad(true);
    }
  }, []);

  const {
    clientName = "",
    credits = [],
    poster = "",
    title = "",
    video_id = null,
  } = workItem;

  const videoHeightAspectRatio = workItem.videoHeightAspectRatio || "9";
  const videoWidthAspectRatio = workItem.videoWidthAspectRatio || "16";

  const fullTitle = clientName ? `${clientName} | ${title}` : title;
  const titledPlayerRef = useTitledVimeoRef(fullTitle, player);

  const moreWork = workItems
    .filter((item) => item._id !== workItem._id)
    .slice(0, MORE_WORK_COUNT);

  const controlButtonClassName =
    "flex h-12 w-12 shrink-0 items-center justify-center text-xl text-white/80 transition-colors hover:text-white sm:h-10 sm:w-10";

  return (
    <Layout
      description={
        workItem.seo_description || `${fullTitle} | Director Jeremy Miller`
      }
      isStillsPageEnabled={isStillsPageEnabled}
      title={workItem.seo_title || `${fullTitle} | Director Jeremy Miller`}
    >
      <article>
        <div
          className={clsx(
            "bpd-player-container relative z-20 bg-neutral-950 text-white",
            isFullscreen
              ? "flex h-screen flex-col items-center justify-center"
              : "py-8 lg:py-12",
          )}
        >
          {video_id ? (
            <ClientOnly>
              <div
                className={clsx(
                  isFullscreen ? "w-full" : globalStyles.container,
                  "transition-all duration-700",
                )}
              >
                <div
                  className={`relative aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} bg-neutral-900`}
                >
                  {poster ? (
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src={urlForSanitySource(poster).width(1600).url()}
                    />
                  ) : (
                    <div />
                  )}
                  <ReactPlayer
                    style={{
                      opacity: showVideo ? 1 : 0,
                      transition: "opacity 700ms",
                    }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen={true}
                    controls={isIpad}
                    frameBorder="0"
                    height={`100%`}
                    title={fullTitle}
                    src={`https://player.vimeo.com/video/${video_id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                    width={`100%`}
                    playing={videoPlaying}
                    muted={muted}
                    onReady={() => {
                      setTimeout(() => {
                        setShowVideo(true);
                      }, 100);
                    }}
                    onDurationChange={() => {
                      if (player.current) {
                        setTotalPlaySeconds(player.current.duration || 0);
                      }
                    }}
                    onStart={() => {
                      setShowVideo(true);
                    }}
                    onEnded={() => {
                      setVideoPlaying(false);
                    }}
                    onPlay={async () => {
                      setIsPlaying(true);
                      setShowVideo(true);
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                    }}
                    ref={titledPlayerRef}
                  ></ReactPlayer>
                  {(!isIpad || !videoPlaying) && (
                    <button
                      aria-label={videoPlaying ? "Pause video" : "Play video"}
                      className="group absolute inset-0 flex cursor-pointer items-center justify-center bg-transparent"
                      onClick={() => {
                        setShowVideo(true);
                        setVideoPlaying(!videoPlaying);
                      }}
                    >
                      <span
                        className={clsx(
                          "flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-neutral-950/30 text-3xl backdrop-blur-sm transition-all duration-500 group-hover:scale-105 lg:h-24 lg:w-24",
                          videoPlaying ? "opacity-0" : "opacity-100",
                        )}
                      >
                        <FiPlay className="translate-x-0.5" />
                      </span>
                    </button>
                  )}
                </div>

                {!isIos ? (
                  <div
                    className={clsx(
                      "flex items-center gap-3 pt-4 sm:gap-5",
                      isFullscreen && "px-5 sm:px-8",
                    )}
                  >
                    <button
                      aria-label={videoPlaying ? "Pause" : "Play"}
                      className={controlButtonClassName}
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      title="Play/Pause"
                    >
                      {videoPlaying ? <FiPause /> : <FiPlay />}
                    </button>
                    <button
                      aria-label="Seek"
                      className="relative h-12 min-w-0 w-full sm:h-10"
                      onClick={(e) => {
                        const scrubberBoundingClientRect =
                          scrubber.current.getBoundingClientRect();

                        const zeroBasedClickPosition =
                          e.clientX - scrubberBoundingClientRect.left;

                        const xPercentageClicked =
                          zeroBasedClickPosition / scrubber.current.clientWidth;

                        if (player.current) {
                          // Calculate the target time based on percentage and duration
                          const targetTime =
                            xPercentageClicked * totalPlaySeconds;
                          player.current.currentTime = targetTime;
                          setScrubberPosition(
                            xPercentageClicked * scrubberWidth,
                          );
                        }
                      }}
                      ref={scrubber}
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px bg-white/25" />
                      <span
                        className="absolute top-1/2 left-0 h-px bg-white"
                        style={{ width: `${scrubberPosition}px` }}
                      />
                      <span
                        className="absolute top-1/2 left-0 -ml-1.5 h-3 w-3 rounded-full bg-white"
                        style={{
                          transform: `translate3d(${scrubberPosition}px, -50%, 0)`,
                        }}
                      />
                    </button>
                    {muted === true ? (
                      <button
                        aria-label="Unmute"
                        className={controlButtonClassName}
                        onClick={() => {
                          setMuted(false);
                        }}
                      >
                        <FiVolumeX />
                      </button>
                    ) : (
                      <button
                        aria-label="Mute"
                        className={controlButtonClassName}
                        onClick={() => {
                          setMuted(true);
                        }}
                      >
                        <FiVolume2 />
                      </button>
                    )}
                    {isFullscreen ? (
                      <button
                        aria-label="Exit fullscreen"
                        className={controlButtonClassName}
                        onClick={() => toggleFullScreen(false)}
                      >
                        <FiMinimize />
                      </button>
                    ) : (
                      <button
                        aria-label="Enter fullscreen"
                        className={controlButtonClassName}
                        onClick={() => toggleFullScreen(true)}
                      >
                        <FiMaximize />
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </ClientOnly>
          ) : (
            <div className={globalStyles.container}>
              <div
                className={`aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700`}
              >
                {poster ? (
                  <img
                    alt={fullTitle}
                    className="h-full w-full object-cover"
                    src={urlForSanitySource(poster).width(1600).url()}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div
          className={clsx(
            globalStyles.container,
            "grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24",
          )}
        >
          <div className="lg:col-span-5">
            {clientName && (
              <p className={clsx(globalStyles.eyebrow, "mb-5")}>{clientName}</p>
            )}
            <h1 className={clsx(globalStyles.h2, "max-w-[18ch]")}>{title}</h1>
          </div>

          {credits && credits.length > 0 && (
            <div className="lg:col-span-7 lg:pt-2">
              <h2 className={clsx(globalStyles.eyebrow, "mb-5")}>Credits</h2>
              <dl className="grid grid-cols-1 gap-x-10 border-t border-neutral-300 sm:grid-cols-2">
                {credits.map((credit, index) => {
                  return (
                    <div
                      className="grid grid-cols-5 gap-4 border-b border-neutral-300 py-3"
                      key={index}
                    >
                      <dt className="col-span-2 text-sm font-medium tracking-[0.06em] text-neutral-500 uppercase">
                        {credit.role}
                      </dt>
                      <dd className="col-span-3 text-base">{credit.value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}
        </div>
      </article>

      {moreWork.length > 0 && (
        <aside className="border-t border-neutral-300 bg-[#eeece8] py-20 lg:py-28">
          <div className={globalStyles.container}>
            <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className={clsx(globalStyles.eyebrow, "mb-5")}>
                  Keep watching
                </p>
                <h2 className={globalStyles.h2}>More work</h2>
              </div>
              <Link
                href="/work"
                className={clsx(
                  globalStyles.textLink,
                  "self-start lg:self-auto",
                )}
              >
                View all work
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <WorkGrid workItems={moreWork} />
          </div>
        </aside>
      )}
    </Layout>
  );
}
