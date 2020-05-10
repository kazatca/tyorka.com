import * as React from 'react';
import { btoa } from 'isomorphic-base64';

interface Props extends React.HTMLProps<HTMLImageElement> {
  color: string
  

}

export const Image: React.FC<Props> = ({color, src, width, height, className}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/></svg>`;
  const [url, setUrl] = React.useState<string>(`data:image/svg+xml;base64,${btoa(svg)}`);

  React.useEffect(() => {
    if(typeof window === 'undefined' || !src){
      return;
    }

    const img = document.createElement('img');

    img.onload = () => setUrl(src);
    img.onerror = () => setUrl(src);

    img.src = src;
  })

  return (
    <img
      className={`fast-image ${className}`}
      src={url}
    />
  );
}