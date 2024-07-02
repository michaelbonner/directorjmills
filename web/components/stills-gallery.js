import classNames from "classnames";
import Image from "next/image";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

export const StillsGallery = ({ images = [] }) => {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const zoomRef = useRef(null);

  if (typeof window === "undefined") return null;

  return (
    <div>
      <Lightbox
        close={() => setIsGalleryModelOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={photoIndex}
        open={isGalleryModelOpen}
        plugins={[Zoom]}
        slides={images.map((image) => ({
          src: image.lightboxSource,
          caption: image.altText,
          width: 1800,
        }))}
        zoom={{ ref: zoomRef }}
      />

      <section className="mx-auto my-12 max-w-13xl px-6 text-center">
        {/* desktop grid */}
        <div
          className={classNames(
            "mt-0 hidden gap-4 px-1",
            "lg:grid lg:grid-cols-6"
          )}
        >
          {images.map((image, index) => {
            const getWidthXHeight = () => {
              const widthXHeight = image.imageUrl
                .split("-")
                .pop()
                .split(".")[0];

              const imageWidth = widthXHeight.split("x")[0];
              const imageHeight = widthXHeight.split("x")[1];

              const scaleRatio =
                imageWidth > imageHeight ? 600 / imageWidth : 200 / imageHeight;

              return {
                width: Math.round(imageWidth * scaleRatio),
                height: Math.round(imageHeight * scaleRatio),
              };
            };

            const { width, height } = getWidthXHeight();

            return (
              <div
                className={classNames(
                  "bpd-gallery-image-container flex justify-center items-center"
                )}
                key={index}
              >
                <Image
                  alt={image.altText}
                  className={`bpd-gallery-image cursor-pointer`}
                  height={height}
                  onClick={() => {
                    setIsGalleryModelOpen(true);
                    setPhotoIndex(index);
                  }}
                  src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                  width={width}
                  unoptimized
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* end: desktop grid */}

        {/* mobile grid */}
        <div
          className={classNames(
            "mt-0 grid grid-cols-2 gap-4 px-1",
            "lg:hidden lg:grid-cols-12"
          )}
        >
          {images.map((image, index) => {
            const getWidthXHeight = () => {
              const widthXHeight = image.imageUrl
                .split("-")
                .pop()
                .split(".")[0];

              const imageWidth = widthXHeight.split("x")[0];
              const imageHeight = widthXHeight.split("x")[1];

              const scaleRatio =
                imageWidth > imageHeight ? 300 / imageWidth : 200 / imageHeight;

              return {
                width: Math.round(imageWidth * scaleRatio),
                height: Math.round(imageHeight * scaleRatio),
              };
            };

            const { width, height } = getWidthXHeight();

            return (
              <div
                className={classNames("bpd-gallery-image-container")}
                key={index}
              >
                <Image
                  alt={image.altText}
                  className={`bpd-gallery-image cursor-pointer`}
                  height={height}
                  onClick={() => {
                    setIsGalleryModelOpen(true);
                    setPhotoIndex(index);
                  }}
                  src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                  width={width}
                  unoptimized
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div>
            );
          })}
        </div>
        {/* end: mobile grid */}
      </section>
    </div>
  );
};

export default StillsGallery;
