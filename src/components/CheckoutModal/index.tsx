import * as React from 'react'
import * as b_ from 'b_'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'gatsby';
import { RootState } from '../../state/reducer'
import { actions } from '../../state/actions'
import Modal from '../Modal'

import './index.scss'

const b = b_.with('checkout-modal')

interface Props {
  total: number
  onClose: () => void
}

const CheckoutModal: React.SFC<Props> = ({ total, onClose }) => {
  const name = useSelector((state: RootState) => state.checkout.name)
  const email = useSelector((state: RootState) => state.checkout.email)

  const dispatch = useDispatch()
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.setField('name', e.target.value))
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.setField('email', e.target.value))

  const checkout = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    push('/success');
  }
  
  return (
    <Modal onClose={onClose}>
      <div className={b('title')}>Оформление заказа</div>
      <form className={b('form')} onSubmit={checkout}>
        <input
          className={b('input')}
          name="name"
          value={name}
          onChange={changeName}
          placeholder="Имя"
          autoFocus
          required
        />
        <input
          className={b('input')}
          type='email'
          name="email"
          value={email}
          onChange={changeEmail}
          placeholder="Email"
          required
        />
        <div className={b('footer')}>
          <div className={b('total')}>На сумму: {total} ₽</div>
          <button className={b('btn')} >Отправить</button>
        </div>
      </form>
    </Modal>
  )
}

export default CheckoutModal
