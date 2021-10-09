import * as React from 'react'
import * as b_ from 'b_'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'gatsby'
import { RootState } from '../../state/reducer'
import { actions } from '../../state/actions'
import Modal from '../Modal'
import { addOrder, Cart } from './firebase'
import { Loading } from './Loader'

import './index.scss'
import { useTranslate } from '../../hooks/translate'

const b = b_.with('checkout-modal')

interface Props {
  total: number
  cart: Cart[]
  onClose: () => void
}

const CheckoutModal: React.SFC<Props> = ({ total, cart, onClose }) => {
  const name = useSelector((state: RootState) => state.checkout.name)
  const email = useSelector((state: RootState) => state.checkout.email)

  const [isLoading, toggleLoading] = React.useState(false)

  const { t } = useTranslate()

  const dispatch = useDispatch()

  const changeName = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(actions.setField('name', e.target.value)),
    [dispatch]
  )

  const changeEmail = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(actions.setField('email', e.target.value)),
    [dispatch]
  )

  const checkout = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      toggleLoading(true)
      e.stopPropagation()
      e.preventDefault()
      await addOrder(name, email, cart)
      toggleLoading(false)

      dispatch(actions.cleanCart());
      navigate('/success')
    },
    [name, email, cart]
  )

  return (
    <Modal onClose={onClose}>
      <div className={b('container')}>
        <div className={b('title')}>{t('Order checkout')}</div>
        <form className={b('form', { loading: isLoading })} onSubmit={checkout}>
          <input
            className={b('input')}
            name="name"
            value={name}
            onChange={changeName}
            placeholder={t('Name')}
            autoFocus
            required
          />
          <input
            className={b('input')}
            type="email"
            name="email"
            value={email}
            onChange={changeEmail}
            placeholder="Email"
            required
          />
          <div className={b('footer')}>
            <div className={b('total')}>
              {t('Amounting to')}: {total} ₽
            </div>
            <button className={b('btn')}>{t('Send')}</button>
          </div>
        </form>
        {isLoading && <Loading />}
      </div>
    </Modal>
  )
}

export default CheckoutModal
