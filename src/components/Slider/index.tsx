import * as React from 'react'
import * as b_ from 'b_'
import { Slider } from './MobileSlider'
import { Slider as DesktopSlider } from './DesktopSlider'
import { Zoom } from './Zoom'
import { Picture } from '../../types'

import './index.scss'

const b = b_.with('slider')

interface Props {
  pictures: Picture[]
  view?: 'small' | 'big' | 'adaptive'
}

export const SliderView: React.FC<Props> = ({
  pictures,
  view = 'adaptive',
}) => {
  const [current, onChangeCurrent] = React.useState(0)

  const [zoomed, toggleZoom] = React.useState(false)

  return (
    <section className={b()}>
      {view !== 'big' && (
        <div className={view === 'adaptive' ? b('mobile-slider') : ''}>
          <Slider
            onClick={() => toggleZoom(true)}
            pics={pictures}
            current={current}
            onChangeCurrent={onChangeCurrent}
          />
        </div>
      )}
      {view !== 'small' && (
        <div className={view === 'adaptive' ? b('desktop-slider') : ''}>
          <DesktopSlider
            onClick={() => null}
            pics={pictures}
            current={current}
            onChangeCurrent={onChangeCurrent}
          />
        </div>
      )}
      {zoomed && (
        <Zoom {...pictures[current]} onClose={() => toggleZoom(false)} />
      )}
    </section>
  )
}
