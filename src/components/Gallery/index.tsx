import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import { Image } from '../FastImage'
import { useGallery } from './hooks'

import './index.scss'

const b = b_.with('gallery')

export const Gallery: React.FC = () => {
  const { gallery } = useGallery()

  return (
    <section className={b()}>
      {gallery.map(item => (
        <Link key={item.id} to={`/single/${item.id}`}>
          <Image 
            className={b('photo')}
            color={item.cover.color}
            src={item.cover.src}
            width={item.cover.originalSize.width}
            height={item.cover.originalSize.height}
            
          />
        </Link>
      ))}
    </section>
  )
}
