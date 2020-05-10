import * as React from 'react'
import * as b_ from 'b_';
import { Image } from 'types';
import {Grid} from '../Grid';

import './index.scss';

const b = b_.with('mobile-slider-slide');

interface Geo {
  positionX?: number
  positionY?: number
  size?: number
}

interface Props {
  slug: string
  pic: Image
  name: string
  geo: Geo
  width: number
  height: number
  current: number
  isScrolling: boolean;
  index: number;
}

interface Point {
  x: number
  y: number
}

const SlideView: React.FC<Props> = ({ slug, name, width, height, index, current, isScrolling, pic, geo }) => {

  const container = React.useRef<HTMLDivElement>(null);

  const [touchStartPoint, startMove] = React.useState<Point>({ x: 0, y: 0 });
  const [touchPoint, setTouchPoint] = React.useState<Point>({ x: 0, y: 0 });
  const [positionPoint, setPositionPoint] = React.useState<Point>({ x: (geo.positionX || 0) * width, y: (geo.positionY || 0) * height });
  const [size, setSize] = React.useState(geo.size || 100);
  const [isMoving, toggleMoving] = React.useState(false);

  const move = (p: Point) => {
    setTouchPoint({
      x: getTouchPositionX(p.x - touchStartPoint.x),
      y: getTouchPositionY(p.y - touchStartPoint.y)
    })
  };

  const stopMove = () => setTouchPoint({ x: 0, y: 0 });

  const commit = (p: Point) => {
    setPositionPoint(p);
    save(slug, name, {
      positionX: p.x/width,
      positionY: p.y/height,
      size
    });
  }

  const position = (index - current) * width;

  const onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    toggleMoving(true);
    startMove({ x: e.touches[0].pageX, y: e.touches[0].pageY });
  };

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    toggleMoving(true);
    startMove({ x: e.pageX, y: e.pageY });
  };

  const onTouchMove = (e: TouchEvent) =>
    move({ x: e.touches[0].pageX, y: e.touches[0].pageY });

  const onMounseMove = (e: MouseEvent) => {
    if(!isMoving) {
      return;
    }
    move({ x: e.pageX, y: e.pageY });
  }

  const onTouchEnd = () => {
    toggleMoving(false);
    commit({
      x: positionPoint.x + touchPoint.x,
      y: positionPoint.y + touchPoint.y
    });
    stopMove();
  }

  const onMouseWheel = (e: WheelEvent) => {
    e.preventDefault();
    const minSize = getMinSize() * 100;
    const ds = (e.deltaY < 0 ? 1 : -1);
    const newSize = size + ds;
    if (newSize < minSize) {
      setSize(minSize);
      return;
    }
    const s = newSize / 100;
    const r = (s + ds / 100) / s;
    setSize(newSize);
    commit({
      x: getBounceX((positionPoint.x - width / 2) * r + width / 2, newSize),
      y: getBounceY((positionPoint.y - height / 2) * r + height / 2, newSize)
    })
  }

  const getMinSize = () => {
    const ratio = width / height;
    const pratio = pic.width && pic.height ? pic.width / pic.height : 1;
    return Math.max(1, pratio / ratio);
  }

  const getTouchPositionX = (dx: number) => {
    const x = positionPoint.x + dx;
    const right = -width * (size - 100) / 100;
    if (x > 0) return -positionPoint.x;
    if (x < right) return right - positionPoint.x;
    return dx;
  }

  const getTouchPositionY = (dy: number) => {
    const y = positionPoint.y + dy;
    const bottom = pic.width && pic.height ? height - pic.height * width / pic.width * size / 100 : 0;
    if (y > 0) return -positionPoint.y;
    if (y < bottom) return bottom - positionPoint.y;
    return dy;
  }

  const getBounceX = (x: number, size: number) => {
    const right = -width * (size - 100) / 100;
    if (x > 0) return 0;
    if (x < right) return right;
    return x;
  }

  const getBounceY = (y: number, size: number) => {
    const bottom = pic.width && pic.height ? height - pic.height * width / pic.width * size / 100 : 0;
    if (y > 0) return 0;
    if (y < bottom) return bottom;
    return y;
  }

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    const el = container.current;
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('mousemove', onMounseMove);
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseup', onTouchEnd);
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    el.addEventListener('wheel', onMouseWheel);

    return () => {
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('mousemove', onMounseMove);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseup', onTouchEnd);
      el.removeEventListener('wheel', onMouseWheel);
    }
  })

  return (
    <div
      className={b('image-wrap', { smooth: !isScrolling })}
      style={{
        left: `${position}px`,
      }}
    >
      <div
        ref={container}
        className={b("image", { moving: isMoving })}
        style={{
          backgroundImage: `url(${pic.src})`,
          backgroundPositionX: `${positionPoint.x + touchPoint.x}px`,
          backgroundPositionY: `${positionPoint.y + touchPoint.y}px`,
          backgroundSize: `${size}%`
        }}
      >
        <Grid />
      </div>
    </div>
  );
}

export default SlideView;

const save = (slug: string, slideName: string, geo: Geo) => {
  fetch(`http://localhost:3000/${slug}/slide/${slideName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(geo),
    credentials: 'include'
  })
}
