import * as React from 'react'
import * as b_ from 'b_'
import { Picture } from '../../../types'
import { SlideView } from './components/SliderView'

import './index.scss'

import unchecked from './static/unchecked.svg'
import checked from './static/checked.svg'
import hat from './static/hat.svg'

const ratio = 1

interface Props {
  pics: Picture[]
  onClick: (pic: Picture) => void
  current: number
  onChangeCurrent: (i: number) => void
}

const b = b_.with('desktop-slider')

export const Slider: React.FC<Props> = ({
  pics,
  onClick,
  current,
  onChangeCurrent,
}) => {
  return (
    <div className={b()}>
      <div className={b('wrapper')}>
        {pics.map((pic, i) => (
          <SlideView
            key={i}
            src={pic.src}
            isActive={i === current}
            onClick={() => onClick(pic)}
          />
        ))}
      </div>
      <div
        className={b('arrow', { left: true })}
        onClick={() =>
          onChangeCurrent((current + pics.length - 1) % pics.length)
        }
      >
        <img src={hat} />
      </div>
      <div
        className={b('arrow', { right: true })}
        onClick={() => onChangeCurrent((current + 1) % pics.length)}
      >
        <img src={hat} />
      </div>
      <div className={b('dots')}>
        {pics.map((_, i) => (
          <div key={i} className={b('dot')} onClick={() => onChangeCurrent(i)}>
            <img src={i === current ? checked : unchecked} alt="o" />
          </div>
        ))}
      </div>
    </div>
  )
}
