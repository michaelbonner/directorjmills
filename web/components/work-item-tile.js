import Link from "next/link";
import { useState } from "react";
import urlForSanitySource from "../lib/urlForSanitySource";

const WorkItemTile = ({ workItem, index, hideAfterCount = 999 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  return (
    <Link
      href={`/work/${workItem.slug.current}`}
      key={workItem._id}
      className={`${
        index >= hideAfterCount ? `lg:hidden` : null
      } relative text-white flex flex-col items-center justify-center space-y-2 lg:space-y-0 bpd-project-tile`}
      style={{
        backgroundImage: workItem.poster
          ? `url(${urlForSanitySource(workItem.poster).width(700)})`
          : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
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
      {hasHovered && workItem.shortClipMp4URL && workItem.shortClipOgvURL && (
        <video
          className={`absolute w-full h-full inset-0 object-cover transition-all duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          muted={true}
          autoPlay={true}
          loop={true}
          playsInline={true}
          preload="none"
        >
          <source id="mp4" src={workItem.shortClipMp4URL} type="video/mp4" />
          <source id="ogv" src={workItem.shortClipOgvURL} type="video/ogg" />
        </video>
      )}
      <div className="z-10 text-center">
        <h2 className="uppercase font-extrabold text-3xl lg:text-2xl">
          {workItem.clientName}
        </h2>
        <h3 className="uppercase font-light text-2xl lg:text-xl">
          {workItem.title}
        </h3>
      </div>
    </Link>
  );
};

export default WorkItemTile;
