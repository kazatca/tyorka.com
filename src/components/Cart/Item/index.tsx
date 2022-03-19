import * as React from 'react'
import * as b_ from 'b_'
import { useDispatch } from 'react-redux'
import { actions } from '../../../state/actions'
import { ShopItem } from '../../../hooks/shop'
import { CroppedImage } from '../../CroppedImage'
import { useTranslate } from '../../../hooks/translate'
import { useConfig } from '../../../hooks/config'
import { Image } from '../../FastImage'

import './index.scss'

const b = b_.with('cart-item')

interface Props {
  product: ShopItem
}

export const Item: React.FC<Props> = ({
  product: { id, title, price, cover },
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslate()
  const remove = () => dispatch(actions.removeFromCart(id))
  const { featureFlags } = useConfig()

  return (
    <div className={b()}>
      {featureFlags?.useCroppedImages ? (
        <Image
          className={b('photo')}
          src={cover.src}
          color={cover.color}
          cropped
        />
      ) : (
        <div>
          <CroppedImage className={b('photo')}>{cover}</CroppedImage>
        </div>
      )}
      <div className={b('side')}>
        <div className={b('title')}>{title}</div>
        <div className={b('price')}>{price} ₽</div>
        <div className={b('remove-btn')} onClick={remove}>
          {t('Remove')}
        </div>
      </div>
      {/* <div className={b('count')}>{count} шт.</div> */}
    </div>
  )
}
