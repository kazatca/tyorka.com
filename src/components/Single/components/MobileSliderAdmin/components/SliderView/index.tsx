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
}

interface State {
  positionX: number
  positionY: number
  touchPositionX: number
  touchPositionY: number
  touchStartPositionX: number 
  touchStartPositionY: number
  isMoving: boolean
  size: number
}

class SlideView extends React.Component<Props, State> {

  private container: HTMLDivElement | null = null;

  constructor(props: Props){
    super(props);
    
    const {geo} = props;

    this.state = {
      positionX: geo.positionX || 0,
      positionY: geo.positionY || 0,
      touchPositionX: 0,
      touchPositionY: 0,
      touchStartPositionX: 0,
      touchStartPositionY: 0,
      size: geo.size || 100,
      isMoving: false
    }
  }

  render(){
    
    const {width, touchPosition, index, current, isScrolling, pic} = this.props;
    const {positionX, positionY, touchPositionX, touchPositionY, size, isMoving} = this.state;

    const position = (index - current) * width + touchPosition;

    return (
      <div
        className={b('image-wrap', {smooth: !isScrolling})}
        style={{
          left: `${position}px`,
        }}
      >
        <div
          ref={el => this.container = el}
          className={b("image", {moving: isMoving})}
          style={{
            backgroundImage: `url(${pic.src})`,
            backgroundPositionX: `${positionX + touchPositionX}px`,
            backgroundPositionY: `${positionY + touchPositionY}px`,
            backgroundSize: `${size}%`
          }}
        />
      </div>      
    );
  }

  private onTouchMove = (e: TouchEvent) => {
    const { touchStartPositionX, touchStartPositionY } = this.state;
    this.setState({
      touchPositionX: this.getTouchPositionX(e.touches[0].pageX - touchStartPositionX),
      touchPositionY: this.getTouchPositionY(e.touches[0].pageY - touchStartPositionY)
    });
  };

  private onTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    this.setState({
      isMoving: true,
      touchStartPositionX: e.touches[0].pageX,
      touchStartPositionY: e.touches[0].pageY,
    });
  };

  private onTouchEnd = () => {
    const {positionX, positionY, touchPositionX, touchPositionY} = this.state;
    this.setState({
      isMoving: false,
      positionX: positionX + touchPositionX,
      positionY: positionY + touchPositionY,
      touchPositionX: 0,
      touchPositionY: 0,
    }, () => this.save());
  };

  private onMouseWheel = (e: WheelEvent) => {
    e.preventDefault();
    const minSize = this.getMinSize()*100;
    const {width, height} = this.props;
    const ds = (e.deltaY <0 ? 1 : -1);
    const size = this.state.size + ds;
    if(size < minSize){
      this.setState({size: minSize});
      return;
    }
    const s = this.state.size/100;
    const r = (s + ds / 100)/s;
    this.setState({
      size,
      positionX: this.getBounceX((this.state.positionX - width/2)*r + width/2, size),
      positionY: this.getBounceY((this.state.positionY - height/2)*r + height/2, size)
    }, () => this.save())
  }

  private getMinSize(){
    const {pic, width, height} = this.props; 
    const ratio = width/height;
    const pratio = pic.width/pic.height;
    return Math.max(1, pratio / ratio);
  }

  private getTouchPositionX(dx: number) {
    const {width} = this.props;
    const {positionX, size} = this.state;
    const x = positionX + dx;
    const right = -width * (size-100) / 100;
    if(x > 0) return -positionX;
    if(x < right) return right - positionX;
    return dx;
  }
  
  private getTouchPositionY(dy: number) {
    const {pic, width, height} = this.props;
    const {positionY, size} = this.state;
    const y = positionY + dy;
    const bottom = height - pic.height * width / pic.width * size/100;
    if(y > 0) return -positionY;
    if(y < bottom) return bottom - positionY;
    return dy;
  }

  private getBounceX(x: number, size: number) {
    const {width} = this.props;
    const right = -width * (size-100) / 100;
    if(x > 0) return 0;
    if(x < right) return right;
    return x;
  }
  
  private getBounceY(y: number, size: number) {
    const {pic, width, height} = this.props;
    const bottom = height - pic.height * width / pic.width * size/100;
    if(y > 0) return 0;
    if(y < bottom) return bottom;
    return y;
  }


  componentDidMount() {
    if (this.container) {
      this.container.addEventListener('touchmove', this.onTouchMove);
      this.container.addEventListener('touchstart', this.onTouchStart);
      this.container.addEventListener('touchend', this.onTouchEnd);
      this.container.addEventListener('touchcancel', this.onTouchEnd);
      this.container.addEventListener('wheel', this.onMouseWheel);
    }
  }
  
  componentWillUnmount() {
    if(this.container){
      this.container.removeEventListener('touchmove', this.onTouchMove);
      this.container.removeEventListener('touchstart', this.onTouchStart);
      this.container.removeEventListener('touchend', this.onTouchEnd);
      this.container.removeEventListener('touchcancel', this.onTouchEnd);
      this.container.removeEventListener('wheel', this.onMouseWheel);
    }
  }

  private save(){
    const {name, slug} = this.props;
    fetch(`http://localhost:3000/${slug}/slide/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        positionX: this.state.positionX,
        positionY: this.state.positionY,
        size: this.state.size
      }),
      credentials: 'omit'
    })
  }
}

export default SlideView;