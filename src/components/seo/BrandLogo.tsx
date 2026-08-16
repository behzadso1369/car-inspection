import Image from "next/image";
import { apiAssetUrl } from "@/lib/media";

type BrandLogoProps = {
  path?: string | null;
  width: number;
  height: number;
  className?: string;
};

export function BrandLogo({ path, width, height, className }: BrandLogoProps) {
  const src = apiAssetUrl(path);
  if (!src) return null;
  const isSvg = /\.svg($|\?)/i.test(src) || /\.svg($|\?)/i.test(String(path));
  if (isSvg) {
    return (
      <img
        src={src}
        alt="کارماچک"
        width={width}
        height={height}
        className={className}
        decoding="async"
      />
    );
  }
  return (
    <Image
      src={src}
      alt="کارماچک"
      width={width}
      height={height}
      className={className}
      sizes={`${width}px`}
    />
  );
}
