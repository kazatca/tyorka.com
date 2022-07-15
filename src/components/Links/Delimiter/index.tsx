import * as React from 'react'
import * as b_ from 'b_';

import './index.scss';

const b = b_.with('links-delimiter');

export const Delimiter = () => 
  <div className={b()} >
    <div className={b('chevron')} />
  </div>