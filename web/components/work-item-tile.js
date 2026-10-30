"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useState } from "react";
import urlForSanitySource from "../lib/urlForSanitySource";

const WorkItemTile = ({ workItem, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  return (
    <Link
      href={`/work/${workItem.slug.current}`}
      className="group block"
      onMouseEnter={() => {
        setHasHovered(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        setHasHovered(true);
        setIsHovered(true);
      }}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div
        className="relative overflow-hidden bg-neutral-900"
        style={{ aspectRatio: "16 / 9" }}
      >
        {workItem.poster && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url(${urlForSanitySource(workItem.poster).width(900)})`,
            }}
          />
        )}
        {hasHovered && workItem.shortClipMp4URL && workItem.shortClipOgvURL && (
          <video
            className={clsx(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              isHovered ? "opacity-100" : "opacity-0",
            )}
            muted={true}
            autoPlay={true}
            loop={true}
            playsInline={true}
            preload="none"
          >
            <source src={workItem.shortClipMp4URL} type="video/mp4" />
            <source src={workItem.shortClipOgvURL} type="video/ogg" />
          </video>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-6 border-t border-neutral-300 pt-4">
        <div className="min-w-0">
          {workItem.clientName && (
            <p className="text-sm font-medium tracking-[0.12em] text-neutral-600 uppercase">
              {workItem.clientName}
            </p>
          )}
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-balance uppercase">
            {workItem.title}
          </h3>
        </div>
        {typeof index === "number" && (
          <span
            className="pt-0.5 text-sm text-neutral-600 tabular-nums transition-colors group-hover:text-neutral-950"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
    </Link>
  );
};

export default WorkItemTile;
