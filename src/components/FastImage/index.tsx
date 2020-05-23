import * as React from 'react'
import { btoa } from 'isomorphic-base64'

import './index.scss';

interface Props extends React.HTMLProps<HTMLImageElement> {
  color: string
}

export const Image: React.FC<Props> = ({
  color,
  src,
  width,
  height,
  className,
}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/></svg>`
  const back = `data:image/svg+xml;base64,${btoa(svg)}`

  return (
    <div className={`fast-image ${className}`}>
      <img src={back} />
      <img src={src} />
    </div>
  )
}
