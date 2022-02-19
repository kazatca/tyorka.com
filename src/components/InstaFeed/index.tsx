import * as React from 'react'
import * as b_ from 'b_'
import { Post } from '../InstaPost'
import { useFeed } from './hooks'

import './index.scss'

const b = b_.with('insta-feed')

export const InstaFeed: React.FC = () => {
  const { posts } = useFeed()
  return (
    <div className={b()}>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
