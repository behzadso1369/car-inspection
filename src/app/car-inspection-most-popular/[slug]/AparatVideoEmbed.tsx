"use client";

import { useState } from "react";

interface AparatVideoEmbedProps {
  hash: string;
  title: string;
  thumbnailUrl: string;
  className?: string;
}

export default function AparatVideoEmbed({
  hash,
  title,
  thumbnailUrl,
  className = "",
}: AparatVideoEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const embedSrc = `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame?autoplay=true`;

  return (
    <section className={`relative z-0 w-full ${className}`} aria-label={title}>
      <div className="relative w-full overflow-hidden rounded-2xl lg:rounded-3xl border border-[#DCDCDC] bg-black shadow-[8px_4px_24px_0px_#EAEAEA40] aspect-video min-h-[168px] lg:min-h-[280px]">
        {playing ? (
          <iframe
            src={embedSrc}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`پخش ویدیو: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/35" aria-hidden />
            <span
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#ED145B] shadow-[0_8px_28px_rgba(237,20,91,0.55)] transition-transform duration-200 group-hover:scale-110 lg:h-24 lg:w-24">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#ED145B]/40" />
                <svg
                  viewBox="0 0 24 24"
                  className="relative ml-0.5 h-8 w-8 fill-white lg:h-11 lg:w-11"
                  aria-hidden
                >
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </span>
            </span>
            <span className="absolute bottom-3 right-3 left-3 line-clamp-1 text-right text-sm font-medium text-white drop-shadow lg:text-base">
              {title}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}
