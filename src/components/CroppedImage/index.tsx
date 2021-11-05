import * as React from 'react'
import * as b_ from 'b_'
import { Picture } from '../../types'
import { useImageLoader, useBackgroundPosition } from './hooks'

import './index.scss'

const b = b_.with('cropped-image')

interface Props {
  className?: string
  children: Picture
}

export const CroppedImage: React.FC<Props> = ({
  className,
  children: { src, crop, color, originalSize },
}) => {
  const { url } = useImageLoader(src)

  const backgroundPosition = useBackgroundPosition(crop, originalSize)

  return (
    <div
      className={[b(), className].filter(Boolean).join(' ')}
      style={{
        backgroundImage: url ? `url(${url})` : undefined,
        backgroundColor: !url ? color : undefined,
        ...backgroundPosition,
      }}
    />
  )
}
