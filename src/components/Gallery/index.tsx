import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import { useCovers } from '../../hooks/covers';
import { ProductsJson } from '../../types';
import {Image} from '../FastImage';
import GalleryAdmin from './Admin';

const {products}: ProductsJson = require('../../products/products.json');

import './index.scss';

const b = b_.with('gallery');


const Gallery: React.FC = () => {
  const covers = useCovers();

  return (
    <section className={b()}>
      {products
        .map(product =>
          <Link
            key={product.id}
            to={`/single/${product.path}` }
          >
            <Image {...covers[product.path]} className={b("photo")}/>
          </Link>
        )}
    </section>
  );
}

const isDev = process.env.NODE_ENV === 'development';

export default () => isDev ? <GalleryAdmin /> : <Gallery />