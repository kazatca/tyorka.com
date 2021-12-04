import * as React from 'react'
import * as b_ from 'b_'
import { Image } from '../../components/FastImage'
import { InstaPost } from '../InstaFeed/hooks'

import './index.scss'

const b = b_.with('insta-post')

export interface Props {
  post: InstaPost
}

export const Post: React.FC<Props> = ({ post: { url, src, color } }) => {
  return (
    <a className={b()} href={url} target="_blank">
      <Image src={src} color={color} />
    </a>
  )
}
