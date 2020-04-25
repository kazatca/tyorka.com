import * as React from 'react';
import * as b_ from 'b_';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducer';
import Item, { Product } from './Item';

import './index.scss';

const b = b_.with('cart');

interface Props {
  products: Product[]
}

interface CartItem {
  product: Product,
  count: number
}

const Cart: React.SFC<Props> = ({products}) => {
  const items = useSelector((state: RootState) => state.cart.items)

  const list = items.map( item => ({
    product: products.find(product => product.id === item.id),
    count: item.count
  }))
  .filter(item => !!item.product) as CartItem[]

  const total = list.reduce((result, {product, count}) => result + (product.price || 0) * count, 0);

  return (
    <div className={b()}>
      <h1>Ваша корзина</h1>
      {list.map(({product, count}) => <Item product={product} count={count} />)}
      {total > 0 && <div className={b('total')}>Итого: {total} ₽</div>}
    </div>
  );
}

export default Cart;