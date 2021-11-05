import { useEffect, useState } from "react";
import { useImage } from '../../../../../hooks/image'

export const useImageLoader = (src: string) => {
  const [url, setUrl] = useState<string | null>(null);

  const fullSrc = useImage(src);

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