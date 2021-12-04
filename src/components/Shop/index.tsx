import * as React from 'react'
import * as b_ from 'b_'
import { useShop } from '../../hooks/shop'
import { ProductView } from './Product'

import './index.scss'

const b = b_.with('shop')

export const ShopView: React.FC = () => {
  const { products } = useShop()
  return (
    <section className={b()}>
      {products.map(product => (
        <ProductView key={product.id} product={product} />
      ))}
    </section>
  )
}
