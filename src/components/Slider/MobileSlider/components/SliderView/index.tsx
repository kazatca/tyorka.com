import * as React from 'react'
import * as b_ from 'b_'
import { Picture } from 'types'
import { useImageLoader } from './hooks'

import './index.scss'

const b = b_.with('mobile-slider-slide')

interface Props {
  pic: Picture
  current: number
  touchPosition: number
  isScrolling: boolean
  index: number
  onClick: () => void
}

const SlideView: React.FC<Props> = ({
  pic,
  touchPosition,
  index,
  current,
  isScrolling,
  onClick,
}) => {
  const { src, crop, color, originalSize } = pic
  const position = (index - current) * originalSize.width + touchPosition

  const { url } = useImageLoader(src)

  return (
    <div
      className={b('image-wrap', { smooth: !isScrolling })}
      style={{
        left: `${position}px`,
      }}
      onClick={onClick}
    >
      <div
        className={b('image')}
        style={{
          backgroundImage: url ? `url(${url})` : undefined,
          backgroundColor: !url ? color : undefined,
          backgroundPositionX: `${(crop.anchor.x || 0) * originalSize.width}px`,
          backgroundPositionY: `${(crop.anchor.y || 0) *
            originalSize.height}px`,
          backgroundSize: `${crop.factor}%`,
        }}
      />
    </div>
  )
}

export default SlideView
