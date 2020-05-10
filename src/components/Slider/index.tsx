import * as React from 'react'
import * as b_ from 'b_'
import SliderEditing from './MobileSliderAdmin';
import Slider from './MobileSlider';
import { usePics } from './hooks';
import Zoom from './Zoom';

import './index.scss';

const b = b_.with('slider');

const isDev = process.env.NODE_ENV === 'development';

interface Props {
  name: string
}

const Single: React.FC<Props> = ({ name }) => {
  const [isEdit, setEditing] = React.useState(false);

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [zoomed, toggleZoom] = React.useState(false);

  const pics = usePics(name);

  const commonProps = {
    pics,
    current: currentSlide,
    onChangeCurrent: setCurrentSlide
  }

  return (
    <section className={b()}>
      {isDev &&
        <button
          className={b('edit', { active: isEdit })}
          onClick={() => setEditing(v => !v)}
        >
          {!isEdit ? '✎' : '✓'}
        </button>
      }
      {isEdit
        ? <SliderEditing slug={name} {...commonProps} />
        : <Slider onClick={() => toggleZoom(true)} {...commonProps} />
      }
      {zoomed && <Zoom {...pics[currentSlide].original} onClose={() => toggleZoom(false)} />}
    </section>
  );
}

export default Single;