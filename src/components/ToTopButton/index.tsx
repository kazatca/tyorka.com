import * as React from 'react'
import * as b_ from 'b_';
import { useScroll } from './hooks'

import './index.scss'

const b = b_.with('to-top-button')

export const ToTopButton: React.FC = () => {
  const { position } = useScroll();

  const scroll = () => {
    window.scrollTo( {top: 0, behavior: 'smooth'});
  }

  return <div className={b({visible: position > 1200})} onClick={scroll}/>
}
