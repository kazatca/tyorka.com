import * as React from 'react';
import Layout from '../components/Layout';
import Cart from '../components/Cart';

const CartPage: React.SFC<{}> = () => {
  return (
    <Layout>
      <Cart />
    </Layout>
  );
}

export default CartPage;