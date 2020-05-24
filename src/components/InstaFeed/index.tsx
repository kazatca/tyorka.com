import * as React from 'react'
import * as b_ from 'b_'
import { InstaPost, Props as Post } from '../InstaPost';

import './index.scss';

const b = b_.with('insta-feed');

interface Props {
  posts: Post[]
}

export const InstaFeed : React.FC<Props> = ({posts}) =>
  <div className={b()}>
    {posts.map(post => <InstaPost {...post} /> )}
  </div>