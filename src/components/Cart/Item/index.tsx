import * as React from 'react'
import * as b_ from 'b_'
import { useDispatch } from 'react-redux';
import { actions } from '../../../state/actions';
import { useSquareCovers } from '../../../hooks/squareCovers'

import './index.scss';
import { useDescription } from '../../../hooks/md';

const b = b_.with('cart-item')

export interface Product {
  id: string
  url: string
  name: string
  price?: number
}
interface Props {
  product: Product
  count: number
}

const Item: React.SFC<Props> = ({
  product: { id, name, price },
  count
}) => {
  const covers = useSquareCovers();

  const { title } = useDescription(name)

  const dispatch = useDispatch();

  const remove = () => dispatch(actions.removeFromCart(id));

  return (
    <div className={b()}>
      <div className={b('photo')}>
        <img src={covers[name]} />
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
