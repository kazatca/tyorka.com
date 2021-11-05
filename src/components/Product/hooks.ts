import { navigate } from 'gatsby-link'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../state/actions'
import { RootState } from '../../state/reducer'

export const useCart = (id: string) => {
  const inCart = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)
  )
  const dispatch = useDispatch()

  const addToCart = () => dispatch(actions.addToCart(id))

  const goToCart = () => navigate('/cart')

  return {
    inCart,
    addToCart,
    goToCart,
  }
}
