import { useEffect, useState } from "react";
import { useImage } from '../../hooks/image'
import { Crop, Size } from "../../types";

export const useImageLoader = (src: string) => {
  const [url, setUrl] = useState<string | null>(null);

  const fullSrc = useImage(src, 'small');

  useEffect(() => {
    if(typeof window === 'undefined' || !fullSrc){
      return;
    }

    const img = document.createElement('img');

    img.onload = () => setUrl(fullSrc || null);
    img.onerror = () => setUrl(fullSrc || null);

    img.src = fullSrc;
  });

  return {
    url
  }
}

export function useBackgroundPosition(
  { anchor: { x, y }, factor }: Crop,
  { width, height }: Size
) {
  const r = width / height;

  const f = factor / 100;

  return {
    backgroundPositionX: `${div(-x, f - 1) * 100}%`,
    backgroundPositionY: `${div(-y, f / r - 1) * 100}%`,
    backgroundSize: `${factor}%`,
  };
}

const div = (n: number, d: number) => (d === 0 ? 0 : clamp(n / d));

const clamp = (x: number) => Math.max(Math.min(x, 1), 0);
