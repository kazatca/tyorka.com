import React from 'react'
import gif from './stopper.gif';

import './styles.scss';

export const Stopper: React.FC = () => (
  <div className='stopper'>
    <img src={gif}></img>
  </div>
)
