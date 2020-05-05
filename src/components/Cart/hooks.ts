import { Product } from './Item'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/reducer'
import { ProductsJson } from '../../types'

const { products }: ProductsJson = require('../../products/products.json')

interface CartItem {
  product: Product
  count: number
}

export const useCart = () => {
  const items = useSelector((state: RootState) => state.cart.items)

  const list = items
    .map(item => {
      const result = products.find(product => product.id === item.id);
      if(!result){
        return;
      }
      const product: CartItem['product'] = {
        id: result.id,
        name: result.path,
        title: result.title,
        url: `/shop/${result.path}`,
        price: result.price
      }
      return {
        product,
        count: item.count,
      }
    })
    .filter(Boolean) as CartItem[]

  const total = list.reduce(
    (result, { product, count }) => result + (product.price || 0) * count,
    0
  );

  return {list, total};
}