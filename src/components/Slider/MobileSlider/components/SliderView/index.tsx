import * as React from 'react'
import * as b_ from 'b_';
import { Image } from 'types';
import './index.scss';

const b = b_.with('mobile-slider-slide');

interface Geo {
  positionX?: number
  positionY?: number
  size?: number
}

interface Props {
  pic: Image
  color?: string
  geo: Geo
  width: number
  height: number
  current: number
  touchPosition: number;
  isScrolling: boolean;
  index: number;
  onClick: () => void
}

const SlideView: React.FC<Props> = ({
  width,
  height,
  touchPosition,
  index,
  current,
  isScrolling,
  pic,
  color,
  geo,
  onClick
}) => {
  const position = (index - current) * width + touchPosition;

  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if(typeof window === 'undefined' || !pic.src){
      return;
    }

    const img = document.createElement('img');

    img.onload = () => setUrl(pic.src || null);
    img.onerror = () => setUrl(pic.src || null);

    img.src = pic.src;
  })

  return (
    <div
      className={b('image-wrap', { smooth: !isScrolling })}
      style={{
        left: `${position}px`,
      }}
      onClick={onClick}
    >
      <div
        className={b("image")}
        style={{
          backgroundImage: url? `url(${url})`: undefined,
          backgroundColor: !url ? color : undefined,
          backgroundPositionX: `${(geo.positionX || 0) * width}px`,
          backgroundPositionY: `${(geo.positionY || 0) * height}px`,
          backgroundSize: `${geo.size}%`
        }}
      />
    </div>
  );
}

export default SlideView;