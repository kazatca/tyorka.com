import * as React from 'react';
import * as b_ from 'b_';

import './index.scss';

const b = b_.with('cart');

const Cart: React.SFC<{}> = () => {
  return (
    <div className={b()}>
      Ваша корзина
    </div>
  );
}

export default Cart;