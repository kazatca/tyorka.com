import * as React from 'react'
import * as b_ from 'b_'
import { useImage } from '../../../../../hooks/image'

import './index.scss'

const b = b_.with('desktop-slider-slide')

interface Props {
  src: string
  isActive: boolean
  onClick: () => void
}

export const SlideView: React.FC<Props> = ({ src, isActive, onClick }) => {
  const href = useImage(src, 'big')
  return (
    <div className={b({ active: isActive })} onClick={onClick}>
      <img className={b('image')} src={href} />
    </div>
  )
}
