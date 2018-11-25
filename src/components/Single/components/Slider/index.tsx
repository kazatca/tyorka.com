import * as React from 'react'
import * as b_ from 'b_';
import {Slide} from '../../types';
import Zoom from '../Zoom';

import './index.scss';

import * as arrow from './static/arrow.png';
import * as unchecked from './static/unchecked.png';
import * as checked from './static/checked.png';

const b = b_.bind(null, 'slider');

interface Props {
  pics: Slide[];
}

interface State {
  current: number;
  zoomed: boolean;
  mouseX?: number;
  mouseY?: number;
}

class Slider extends React.Component<Props, State> {

  state: State = {current: 0, zoomed: false}

  render(){
    const {pics} = this.props;
    const {current, zoomed} = this.state;
    return (
      <section className={b()}>
        <div className={b('image-wrap')}>
          {pics.map((pic, i) =>
            <img
              className={b("image", {active: i === current})}
              src={pic.preview.src}
              alt="whale"
              onClick={e => this.zoom(e.nativeEvent)}
            />
          )}
          <img
            className={b("arrow", {left: true})}
            src={arrow}
            alt="left"
            onClick={() => this.slide(-1)}
          />
          <img
            className={b("arrow", {right: true})}
            src={arrow}
            alt="right"
            onClick={() => this.slide(1)}
          />
        </div>
        <div className={b('dots')}>
          {pics.map((pic, i) => (
            <div
              key={i}
              className={b('dot')}
              onClick={() => this.setState({current: i})}
            >
              <img src={i === this.state.current ? checked: unchecked} alt="dot"/>
            </div>
          ))}
        </div>
        {this.state.zoomed && 
          <Zoom
            {...pics[current].original}
            mouseX={this.state.mouseX}
            mouseY={this.state.mouseY}
            onClose={() => this.setState({zoomed: false})}
          />
        }
      </section>)
  }

  slide(dir){
    const n = this.props.pics.length;
    this.setState({current: (n + this.state.current + dir)%n});
  }

  zoom = (e: MouseEvent) => {
    this.setState({
      zoomed: true,
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }
}

export default Slider;