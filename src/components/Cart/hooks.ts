import { useSelector } from 'react-redux'
import { RootState } from '../../state/reducer'
import { useShop } from '../../hooks/shop'

export const useCart = () => {
  const { products } = useShop()
  const items = useSelector((state: RootState) => state.cart.items)

  const cart = items.map(item => ({
    product: products.find(product => product.id === item.id)!,
    count: item.count,
  }))

  const total = cart.reduce(
    (result, { product, count }) => result + (product.price || 0) * count,
    0
  )

  return { cart, total }
}
