import * as React from 'react'
import * as b_ from 'b_';
import {Image} from '../../../../types';
import './index.scss';

const b = b_.with('mobile-slider-slide');

interface Geo {
  positionX?: number
  positionY?: number
  size?: number
}

interface Props{
  slug: string
  pic: Image
  name: string
  geo: Geo
  width: number
  height: number
  current: number
  touchPosition: number;
  isScrolling: boolean;
  index: number;
  onClick: () => void
}

class SlideView extends React.Component<Props> {

  render(){
    
    const {width, touchPosition, index, current, isScrolling, pic, geo, onClick} = this.props;

    const position = (index - current) * width + touchPosition;

    return (
      <div
        className={b('image-wrap', {smooth: !isScrolling})}
        style={{
          left: `${position}px`,
        }}
        onClick={onClick}
      >
        <div
          className={b("image")}
          style={{
            backgroundImage: `url(${pic.src})`,
            backgroundPositionX: `${geo.positionX}px`,
            backgroundPositionY: `${geo.positionY}px`,
            backgroundSize: `${geo.size}%`
          }}
        />
      </div>      
    );
  }
}

export default SlideView;