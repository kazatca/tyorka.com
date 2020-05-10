import * as React from 'react'
import * as b_ from 'b_';
import PinchZoom from 'pinch-zoom-js';
import { Image } from '../../../types';

import './index.scss';

const b = b_.with('zoom');

type Props = Image & {
  onClose: () => void;
};

const Zoom: React.FC<Props> = ({ src, onClose }) => {

  React.useEffect(() => {
    window.document.body.classList.add('overflow-hidden');

    return () => {
      window.document.body.classList.remove('overflow-hidden');
    }
  })

  return (
    <div className={b()} onClick={onClose} >
      <img
        ref={el => el && new PinchZoom(el)}
        src={src || undefined}
      />
    </div>);
}

export default Zoom;