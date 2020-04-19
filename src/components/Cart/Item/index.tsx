import * as React from 'react';
import * as b_ from 'b_';

const b = b_.with('cart-item');


const Item: React.SFC<{}> = () => {
  return (
    <div className={b()}>
      <div className={b('photo')}>
        <img src='' />
      </div>

    </div>
  );
}

export default Item;