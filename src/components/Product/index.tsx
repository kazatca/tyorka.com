import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as b_ from 'b_';
import { push } from 'gatsby';
import { Slide } from '../Single/types';
import { actions } from '../../state/actions';
import { RootState } from '../../state/reducer';

import './index.scss';

interface Props {
  id: string
  pics: Slide[];
  title: string
  price?: number
}

const b = b_.with('product');

const Product: React.SFC<Props> = ({id, pics, title, price}) => {
  const inCart = useSelector((state: RootState) => state.cart.items.find(item => item.id === id))
  const dispatch = useDispatch();

  const addToCart = () => dispatch(actions.addToCart(id));

  const goToCart = () => push('/cart')

  return (
    <div className={b()}>
      <section>
        <div className={b('photo')}>
          <img src={pics[0].preview.src || ''} />
        </div>
      </section>

      <section>
        <div className={b('column')}>
          <div className={b('title')}>
            {title}
          </div>

          {price && <div className={b('price')}>
            {price} ₽
          </div>}

          <div>
            <button 
              className={b('btn')} 
              onClick={inCart ? goToCart: addToCart}
            >
              {inCart ? 'Перейти в корзину' : 'Добавить в корзину'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product