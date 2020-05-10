import * as React from 'react'
import { Link } from 'gatsby'
import * as b_ from 'b_'
import { useCovers } from '../../hooks/covers';
import { ProductsJson } from '../../types';
import {Image} from '../FastImage';

const {products}: ProductsJson = require('../../products/products.json');

import './index.scss';

const b = b_.with('gallery');


const Gallery: React.SFC = () => {
  const covers = useCovers();

  return (
    <section className={b()}>
      {products
        .map(product =>
          <Link
            key={product.id}
            to={`/single/${product.path}` }
            className={b("photo")}
          >
            <Image {...covers[product.path]}/>
          </Link>
        )}
    </section>
  );
}


export default Gallery;