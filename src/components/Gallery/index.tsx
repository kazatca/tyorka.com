import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import { useCovers } from '../../hooks/covers'
import { Image } from '../FastImage'
import GalleryAdmin from './Admin'
import { products } from './consts';


import './index.scss'

const b = b_.with('gallery')

const Gallery: React.FC = () => {
  const covers = useCovers()

  return (
    <section className={b()}>
      {products.map(product => (
        <Link key={product.id} to={`/single/${product.path}`}>
          <Image {...covers[product.path]} className={b('photo')} />
        </Link>
      ))}
    </section>
  )
}

const isDev = process.env.NODE_ENV === 'development'

const GalleryWithControls: React.FC = () => {
  const [isEdit, toggleEdit] = React.useState(false)

  return (
    <div className={b('wrap')}>
      {isDev && (
        <button 
        className={b('edit-btn', {active: isEdit})}
          onClick={() => toggleEdit(v => !v)}
        >
          {!isEdit ? '✎' : '✓'}
        </button>
      )}
      {isEdit ? <GalleryAdmin /> : <Gallery />}
    </div>
  )
}
export default GalleryWithControls
