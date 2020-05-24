import * as React from 'react'
import * as b_ from 'b_'
import { Image } from '../../components/FastImage'

import './index.scss'

const b = b_.with('insta-post')

export interface Props {
  id: string
  src: string
  color: string
}

export const InstaPost: React.FC<Props> = ({ id, src, color }) => {
  return (
    <a className={b()} href={`https://www.instagram.com/p/${id}/`} target="_blank">
      <Image src={src} color={color}/>
    </a>
  )
}
