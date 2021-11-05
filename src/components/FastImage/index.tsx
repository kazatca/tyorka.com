import * as React from 'react'
import * as b_ from 'b_';
import { btoa } from 'isomorphic-base64'
import { useImage } from '../../hooks/image'

import './index.scss';

const b = b_.with('fast-image');

interface Props extends React.HTMLProps<HTMLImageElement> {
  color: string
  src: string
}

export const Image: React.FC<Props> = ({
  className,
  color,
  src,
  width = 10,
  height = 10
}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/></svg>`
  const back = `data:image/svg+xml;base64,${btoa(svg)}`;

  return (
    <div className={`${b()} ${className || ''}`}>
      <img src={back} className={b('back')}/>
      <img src={useImage(src)} className={b('image')}/>
    </div>
  )
}
