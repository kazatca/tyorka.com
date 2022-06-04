import * as React from 'react'
import * as b_ from 'b_'
import { Picture, Size } from '../../../../../types'
import { Image } from '../../../../FastImage'

import './index.scss'

const b = b_.with('mobile-slider-slide')

interface Props {
  pic: Picture
  layout: Size
  current: number
  touchPosition: number
  isScrolling: boolean
  index: number
  onClick: () => void
}

export const SlideView: React.FC<Props> = ({
  pic,
  layout,
  touchPosition,
  index,
  current,
  isScrolling,
  onClick,
}) => {
  const position = (index - current) * layout.width + touchPosition

  return (
    <div
      className={b('image-wrap', { smooth: !isScrolling })}
      style={{
        left: `${position}px`,
      }}
      onClick={onClick}
    >
      <Image className={b('image')} src={pic.src} color={pic.color} cropped />
    </div>
  )
}
