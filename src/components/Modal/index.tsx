import * as React from 'react'

import './index.scss';

interface Props {
  onClose: () => void
}
const Modal: React.SFC<Props> = ({ onClose, children }) => {
  return (
    <>
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal__close" onClick={onClose} />
        {children}
      </div>
    </>
  )
}

export default Modal
