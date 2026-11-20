"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";

type WatermarkedVideoProps = {
  src: string;
  // Shown on the picture, for example the buyer's email.
  watermark: string;
};

// Four name tags sit in the corners and take turns, so the tag keeps moving around the picture.
const watermarkPositions = ["top-4 left-4", "top-4 right-4", "bottom-16 left-4", "bottom-16 right-4"];

export function WatermarkedVideo({ src, watermark }: WatermarkedVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Full screen is done on the wrapper, so the name tag stays visible in full screen too.
  async function handleFullscreen() {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await wrapper.requestFullscreen();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div ref={wrapperRef} className="relative overflow-hidden rounded-2xl bg-black">
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(event) => event.preventDefault()}
          className="aspect-video w-full"
        />
        {watermarkPositions.map((position, index) => (
          <span
            key={position}
            aria-hidden="true"
            style={{ animationDelay: `${index * 6}s` }}
            className={`watermark-cycle caption-2 pointer-events-none absolute opacity-0 select-none text-white ${position}`}
          >
            {watermark}
          </span>
        ))}
      </div>
      <Button variant="secondary" size="sm" onClick={handleFullscreen} className="self-start">
        Full screen
      </Button>
    </div>
  );
}
