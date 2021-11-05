import * as React from 'react';
import * as b_ from 'b_';
import { useTranslate } from '../../hooks/translate';
import Slider from '../Slider';
import { ProductItem } from '../../types';
import { useCart } from './hooks';

import './index.scss';

interface Props {
  product: ProductItem
}

const b = b_.with('product');

const price = 2000;

const Product: React.FC<Props> = ({ product }) => {
  const { t } = useTranslate();
  const { addToCart, goToCart, inCart} = useCart(product.id)


  return (
    <div className={b()}>
      <section>
        <Slider pictures={product.pictures} />
      </section>

      <section>
        <div className={b('column')}>
          <div className={b('title')}>
            {product.title}
          </div>

          {price && <div className={b('price')}>
            {price} ₽
          </div>}

          <div>
            <button
              className={b('btn')}
              onClick={inCart ? goToCart : addToCart}
            >
              {inCart ? t('Go to cart') : t('Add to cart')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product