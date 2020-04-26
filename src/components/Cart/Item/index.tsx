import * as React from 'react'
import * as b_ from 'b_'
import { useDispatch } from 'react-redux';
import { actions } from '../../../state/actions';

import './index.scss';

const b = b_.with('cart-item')

export interface Product {
  id: string
  url: string
  cover: string
  title: string
  price?: number
}
interface Props {
  product: Product
  count: number
}

const Item: React.SFC<Props> = ({
  product: { id, cover, title, price },
  count
}) => {
  const dispatch = useDispatch();

  const remove = () => dispatch(actions.removeFromCart(id));

  return (
    <div className={b()}>
      <div className={b('photo')}>
        <img src={cover} />
      </div>
      <div>
        <div className={b('title')}>{title}</div>
        <div className={b('price')}>{price} ₽</div>
      </div>
      {/* <div className={b('count')}>{count} шт.</div> */}
      <div className={b('remove-btn')} onClick={remove}/>
    </div>
  )
}

export default Item
