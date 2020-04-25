import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as b_ from 'b_';
import { Slide } from '../Single/types';
import { actions } from '../../state/actions';

import './index.scss';

interface Props {
  id: string
  pics: Slide[];
  title: string
  price?: number
}

const b = b_.with('product');

const Product: React.SFC<Props> = ({id, pics, title, price}) => {
  const dispatch = useDispatch();

  const addToCart = () => dispatch(actions.addToCart(id))
  return (
    <div className={b()}>
      <section>
        <div className={b('photo')}>
          <img src={pics[0].preview.src} />
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
            <button className={b('btn')} onClick={addToCart}>Добавить в корзину</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product