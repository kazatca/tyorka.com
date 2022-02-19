import * as React from 'react'
import * as b_ from 'b_'
import PinchZoom from 'pinch-zoom-js'
import { Picture } from '../../../types'
import { useImage } from '../../../hooks/image'

import './index.scss'

const b = b_.with('zoom')

type Props = Picture & {
  onClose: () => void
}

export const Zoom: React.FC<Props> = ({ src, onClose }) => {
  React.useEffect(() => {
    window.document.body.classList.add('overflow-hidden')

    return () => {
      window.document.body.classList.remove('overflow-hidden')
    }
  })

  return (
    <div className={b()} onClick={onClose}>
      <img
        ref={el => el && new PinchZoom(el)}
        src={useImage(src, 'big') || undefined}
      />
    </div>
  )
}
