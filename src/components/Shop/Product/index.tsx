import * as React from 'react'
import * as b_ from 'b_'
import { Link } from 'gatsby'
import { ShopItem } from '../../../hooks/shop'
import { useConfig } from '../../../hooks/config'
import { Image } from '../../FastImage'
import { CroppedImage } from '../../CroppedImage'

import './index.scss'

interface Props {
  product: ShopItem
}

const b = b_.with('shop-product')

export const ProductView: React.FC<Props> = ({
  product: { price, title, id, cover },
}) => {
  const { featureFlags } = useConfig()
  return (
    <Link className={b()} to={`/shop/${id}`}>
      {featureFlags?.useCroppedImages ? (
        <Image
          src={cover.src}
          color={cover.color}
          cropped={featureFlags?.useCroppedImages}
        />
      ) : (
        <div>
          <CroppedImage className={b('photo')}>{cover}</CroppedImage>
        </div>
      )}
      <div className={b('title')}>{title}</div>
      {price && <div className={b('price')}>{price} ₽</div>}
    </Link>
  )
}
