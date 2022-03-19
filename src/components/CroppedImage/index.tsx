import * as React from 'react'
import * as b_ from 'b_'
import { Picture } from '../../types'
import { useImageLoader, useBackgroundPosition } from './hooks'
import { useConfig } from '../../hooks/config'

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
  const { featureFlags } = useConfig()
  const { url } = useImageLoader(src)

  const backgroundPosition = useBackgroundPosition(crop, originalSize)

  if (featureFlags?.useCroppedImages) {
    return (
      <img
        className={className}
        // @ts-ignore
        src={url}
        style={{
          backgroundColor: !url ? color : undefined,
        }}
      />
    )
  }

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
