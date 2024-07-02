import Image from "next/image";
import { useRef, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
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
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 2,
            900: 3,
            1200: 4,
            1600: 6,
            2000: 8,
          }}
          gutter="10px"
        >
          <Masonry>
            {images.map((image, index) => {
              const getWidthXHeight = () => {
                const widthXHeight = image.imageUrl
                  .split("-")
                  .pop()
                  .split(".")[0];

                const imageWidth = widthXHeight.split("x")[0];
                const imageHeight = widthXHeight.split("x")[1];

                const scaleRatio = 600 / imageWidth;

                return {
                  width: Math.round(imageWidth * scaleRatio),
                  height: Math.round(imageHeight * scaleRatio),
                };
              };

              const { width, height } = getWidthXHeight();

              return (
                <div className="p-2" key={index}>
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
          </Masonry>
        </ResponsiveMasonry>
      </section>
    </div>
  );
};

export default StillsGallery;
