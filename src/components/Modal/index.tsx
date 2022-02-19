import * as React from 'react'
import * as b_ from 'b_'

import './index.scss'

const b = b_.with('modal')
interface Props {
  onClose: () => void
}
export const Modal: React.FC<Props> = ({ onClose, children }) => (
  <>
    <div className={b('overlay')} onClick={onClose} />
    <div className={b()}>
      <div className={b('close')} onClick={onClose} />
      {children}
    </div>
  </>
)
