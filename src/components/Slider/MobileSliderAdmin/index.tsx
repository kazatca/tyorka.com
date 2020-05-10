import * as React from 'react'
import SlideView from './components/SliderView';
import * as b_ from 'b_';
import {Slide} from '../../../types';

import './index.scss';

import * as unchecked from './static/unchecked.svg';
import * as checked from './static/checked.svg';

const ratio = 1;

interface Props {
  current: number
  slug: string
  pics: Slide[];
  onChangeCurrent: (i: number) => void
}

interface State {
  width: number;
  touchPosition: number;
  isScrolling: boolean;
  touchStartPosition: number;
  zoomed: boolean
  mouseX?: number
  mouseY?: number
}

const b = b_.with('mobile-slider');

export class Slider extends React.Component<Props, State> {
  private container: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      touchPosition: 0,
      touchStartPosition: 0,
      isScrolling: true,
      zoomed: false
    };
  }

  render() {
    const { slug, pics, current, onChangeCurrent } = this.props;

    const { width, isScrolling } = this.state;
    
    return (
      <div
        className={b()}
        ref={el => (this.container = el)}
      >
        <div className={b('wrapper')} style={{height: `${width/ratio}px`}}>
          {width &&
            pics.map((pic, i) => (
              pic.preview && <SlideView
                key={i}
                slug={slug}
                name={pic.id}
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
                isScrolling={isScrolling}
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
              <img src={i === current ? checked: unchecked} alt="o"/>
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
  
  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    window.document.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }
}

export default Slider;