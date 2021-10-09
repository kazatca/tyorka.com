import * as React from 'react'
import * as b_ from 'b_';
import { Slide } from '../../../../types';
import Zoom from '../Zoom';

import './index.scss';

import arrow from './static/arrow.png';
import unchecked from './static/unchecked.png';
import checked from './static/checked.png';

const b = b_.with('slider');

interface Props {
  pics: Slide[];
}

interface ZoomParams {
  mouseX: number;
  mouseY: number;
}

const Slider: React.FC<Props> = ({ pics }) => {
  const [current, setCurrent] = React.useState(0);
  const [zoomParams, setZoomParams] = React.useState<ZoomParams | null>(null);

  const zoomedImage = zoomParams !== null && pics[current].original;

  const slide = (dir: number) => {
    const n = pics.length;
    setCurrent((n + (current || 0) + dir) % n);
  }

  const zoom = (e: MouseEvent) => {
    setZoomParams({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }

  const zoomOut = () => setZoomParams(null);

  return (
    <section className={b()}>
      <div className={b('image-wrap')}>
        {pics.map((pic, i) =>
          <img
            className={b("image", { active: i === current })}
            src={pic.preview?.src || undefined}
            alt="whale"
            onClick={e => zoom(e.nativeEvent)}
          />
        )}
        <img
          className={b("arrow", { left: true })}
          src={arrow}
          alt="left"
          onClick={() => slide(-1)}
        />
        <img
          className={b("arrow", { right: true })}
          src={arrow}
          alt="right"
          onClick={() => slide(1)}
        />
      </div>
      <div className={b('dots')}>
        {pics.map((pic, i) => (
          <div
            key={i}
            className={b('dot')}
            onClick={() => setCurrent(i)}
          >
            <img src={i === current ? checked : unchecked} alt="dot" />
          </div>
        ))}
      </div>
      {zoomParams &&
        <Zoom
          {...zoomedImage}
          {...zoomParams}
          onClose={zoomOut}
        />
      }
    </section>)

}

export default Slider;