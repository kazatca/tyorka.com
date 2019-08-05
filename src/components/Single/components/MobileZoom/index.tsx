import * as React from 'react'
import * as b_ from 'b_';
import PinchZoom from 'pinch-zoom-js';
import { Image } from '../../types';

import './index.scss';

const b = b_.with('zoom');

type Props = Image & {
  onClose: () => void;
};

class Zoom extends React.Component<Props> {

  render(){
    const {src, onClose} = this.props;
    return (
      <div
        className={b()}
        onClick={onClose}
      >
        <img
          ref={el => el && new PinchZoom(el)}
          src={src}
        />
      </div>);
  }
}

export default Zoom;