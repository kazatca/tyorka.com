import * as React from 'react'
import * as b_ from 'b_';
import { Picture } from '../../../types';
import { SlideView } from './components/SliderView';

import './index.scss';

import unchecked from './static/unchecked.svg';
import checked from './static/checked.svg';

const ratio = 1;

interface Props {
  pics: Picture[];
  onClick: (pic: Picture) => void
  current: number;
  onChangeCurrent: (i: number) => void
}

const b = b_.with('mobile-slider');

export const Slider: React.FC<Props> = ({ pics, onClick, current, onChangeCurrent }) => {
  const [width, setWidth] = React.useState(0);
  const [touchStartPosition, setTouchStartPosition] = React.useState(0)
  // const [touchStartPositionY, setTouchStartPositionY] = React.useState(0)
  const [touchPosition, setTouchPosition] = React.useState(0);
  const [isScrolling, toggleScrolling] = React.useState(false);

  const container = React.useRef<HTMLDivElement>(null);

  const updateWidth = () => {
    if (container.current) {
      const { width } = container.current.getBoundingClientRect();
      setWidth(width);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setTouchPosition(getTouchPosition(e.touches[0].pageX - touchStartPosition));
    // const d = touchStartPositionY - e.touches[0].pageY;
    //   window.scrollBy({
    //   top: d
    // })
    // setTouchStartPositionY(e.touches[0].pageY);
  };

  const onTouchStart = (e: TouchEvent) => {
    toggleScrolling(true);
    setTouchStartPosition(e.touches[0].pageX);
    // setTouchStartPositionY(e.touches[0].pageY);
  };

  const onTouchEnd = () => {
    toggleScrolling(false);
    onChangeCurrent(getCurrent());
    setTouchPosition(0);
  };

  const getTouchPosition = (x: number) => {
    // bounce
    if (pics.length && ((current === 0 && x > 0) || (current === pics.length - 1 && x < 0))) {
      return x / 10;
    }
    return x;
  }

  const getCurrent = () => {
    const distance = Math.round(touchPosition / (width / 2));
    const newCurrent = current - (distance ? distance / Math.abs(distance) : 0);

    if (pics.length) {
      if (newCurrent < 0) {
        return 0;
      }
      if (newCurrent > pics.length - 1) {
        return pics.length - 1;
      }
    }
    return newCurrent;
  }

  React.useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    window.document.addEventListener('resize', updateWidth);

    if (!container.current) {
      return;
    }
    const el = container.current;
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('resize', updateWidth);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
    }
  });


  return (
    <div
      className={b()}
      
    >
      <div className={b('wrapper')} style={{ height: `${width / ratio}px` }} ref={container}>
        {width &&
          pics.map((pic, i) => (
            pic && <SlideView
              key={i}
              pic={pic}
              index={i}
              current={current}
              touchPosition={touchPosition}
              isScrolling={isScrolling}
              onClick={() => onClick(pic)}
              layout={{
                width,
                height: width / ratio
              }}
            />
          ))}
      </div>
      <div className={b('dots')}>
        {pics.map((_, i) => (
          <div
            key={i}
            className={b('dot')}
            onClick={() => onChangeCurrent(i)}
          >
            <img src={i === current ? checked : unchecked} alt="o" />
          </div>
        ))}
      </div>
    </div >
  );
}

export default Slider;