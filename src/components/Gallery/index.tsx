import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import { Image } from '../FastImage'
import { useGallery } from './hooks'

import './index.scss'

const b = b_.with('gallery')

const Gallery: React.FC = () => {
  const { gallery } = useGallery()

  return (
    <section className={b()}>
      {gallery.map(item => (
        <Link key={item.id} to={`/single/${item.id}`}>
          <Image className={b('photo')} {...item} />
        </Link>
      ))}
    </section>
  )
}

export default Gallery
