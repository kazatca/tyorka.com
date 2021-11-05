import * as React from 'react'
import * as b_ from 'b_'
import Slider from './MobileSlider'
import Zoom from './Zoom'
import { Picture } from '../../types'

import './index.scss'

const b = b_.with('slider')

interface Props {
  pictures: Picture[]
}

const SliderView: React.FC<Props> = ({ pictures }) => {
  const [current, onChangeCurrent] = React.useState(0)

  const [zoomed, toggleZoom] = React.useState(false)

  const commonProps = {
    pics: pictures,
    current,
    onChangeCurrent,
  }

  return (
    <section className={b()}>
      <Slider onClick={() => toggleZoom(true)} {...commonProps} />
      {zoomed && (
        <Zoom
          {...pictures[current]}
          onClose={() => toggleZoom(false)}
        />
      )}
    </section>
  )
}

export default SliderView
