import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as b_ from 'b_';
import { push } from 'gatsby';
import { actions } from '../../state/actions';
import { RootState } from '../../state/reducer';
import { useTranslate } from '../../hooks/translate';
import { usePics } from './hooks';

import './index.scss';
import { useDescription } from '../../hooks/md';

interface Props {
  id: string
  name: string
  price?: number
}

const b = b_.with('product');

const Product: React.FC<Props> = ({id, name, price}) => {
  const inCart = useSelector((state: RootState) => state.cart.items.find(item => item.id === id))
  const dispatch = useDispatch();

  const { t } = useTranslate();

  const pics = usePics(name);

  const {title} = useDescription(name);

  const addToCart = () => dispatch(actions.addToCart(id));

  const goToCart = () => push('/cart')

  return (
    <div className={b()}>
      <section>
        <div className={b('photo')}>
          <img src={pics[0]?.preview?.src || ''} />
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
              {inCart ? t('Go to cart') : t('Add to cart')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product