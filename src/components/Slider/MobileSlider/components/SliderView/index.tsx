import * as React from 'react'
import * as b_ from 'b_'
import { Picture, Size } from '../../../../../types'
import { CroppedImage } from '../../../../CroppedImage'

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
      <CroppedImage className={b('image')}>{pic}</CroppedImage>
    </div>
  )
}
