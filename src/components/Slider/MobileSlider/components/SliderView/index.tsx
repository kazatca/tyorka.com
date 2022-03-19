import * as React from 'react'
import * as b_ from 'b_'
import { useConfig } from '../../../../../hooks/config'
import { Picture, Size } from '../../../../../types'
import { CroppedImage } from '../../../../CroppedImage'
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
  const { featureFlags } = useConfig()

  return (
    <div
      className={b('image-wrap', { smooth: !isScrolling })}
      style={{
        left: `${position}px`,
      }}
      onClick={onClick}
    >
      {featureFlags?.useCroppedImages ? (
        <Image className={b('image')} src={pic.src} color={pic.color} cropped />
      ) : (
        <CroppedImage className={b('image')}>{pic}</CroppedImage>
      )}
    </div>
  )
}
