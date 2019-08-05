import * as React from 'react'
import SlideView from './components/SliderView';
import * as b_ from 'b_';
import {Slide} from '../../types';

import './index.scss';

import * as unchecked from './static/unchecked.svg';
import * as checked from './static/checked.svg';

const ratio = 3/2;

interface Props {
  slug: string
  pics: Slide[];
  onClick: (pic: Slide) => void
}

interface State {
  width: number;
  current: number;
  touchPosition: number;
  isScrolling: boolean;
  touchStartPosition: number;
  zoomed: boolean
}

const b = b_.with('mobile-slider');

export class Slider extends React.Component<Props, State> {
  private container: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      current: 0,
      touchPosition: 0,
      touchStartPosition: 0,
      isScrolling: true,
      zoomed: false
    };
  }

  render() {
    const { slug, pics, onClick } = this.props;
    const { current, width, touchPosition, isScrolling } = this.state;
    
    return (
      <div
        className={b()}
        ref={el => (this.container = el)}
      >
        <div className={b('wrapper')} style={{height: `${width/ratio}px`}}>
          {width &&
            pics.map((pic, i) => (
              <SlideView
                key={i}
                slug={slug}
                name={pic.name}
                pic={pic.preview}
                geo={{
                  positionX: pic.positionX,
                  positionY: pic.positionY,
                  size: pic.size
                }}
                index={i}
                width={width}
                height={width/ratio}
                current={current}
                touchPosition={touchPosition}
                isScrolling={isScrolling}
                onClick={() => onClick(pic)}
              />
            ))}
        </div>
        <div className={b('dots')}>
          {pics.map((_, i) => (
            <div
              key={i}
              className={b('dot')}
              onClick={() => this.setState({current: i})}
            >
              <img src={i === this.state.current ? checked: unchecked} alt="o"/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  private updateWidth = () => {
    if (this.container) {
      const { width } = this.container.getBoundingClientRect();
      this.setState({ width });
    }
  };

  private onTouchMove = (e: TouchEvent) => {
    const { touchStartPosition } = this.state;
    this.setState({
      touchPosition: this.getTouchPosition(e.touches[0].pageX - touchStartPosition)
    });
  };

  private onTouchStart = (e: TouchEvent) => {
    this.setState({
      touchStartPosition: e.touches[0].pageX,
      isScrolling: true
    });
  };

  private onTouchEnd = (e: TouchEvent) => {
    this.setState({
      current: this.getCurrent(),
      touchPosition: 0,
      isScrolling: false
    });
  };

  private getTouchPosition(x: number) {
    const { pics } = this.props;
    const { current } = this.state;
    // bounce
    if (pics.length && ((current === 0 && x > 0) || (current === pics.length - 1 && x < 0))) {
      return x / 10;
    }
    return x;
  }

  private getCurrent() {
    const { pics } = this.props;
    const { width, touchPosition, current } = this.state;

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

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    window.document.addEventListener('resize', this.updateWidth);

    if (this.container) {
      this.container.addEventListener('touchmove', this.onTouchMove);
      this.container.addEventListener('touchstart', this.onTouchStart);
      this.container.addEventListener('touchend', this.onTouchEnd);
      this.container.addEventListener('touchcancel', this.onTouchEnd);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
    if (this.container) {
      this.container.removeEventListener('touchmove', this.onTouchMove);
      this.container.removeEventListener('touchstart', this.onTouchStart);
      this.container.removeEventListener('touchend', this.onTouchEnd);
      this.container.removeEventListener('touchcancel', this.onTouchEnd);
    }
  }
}

export default Slider;