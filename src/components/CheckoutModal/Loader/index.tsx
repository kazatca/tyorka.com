import * as React from 'react';

import './index.scss';

const range = (n: number) => new Array(n).fill(0).map((_, i) => i)

export const Loading: React.FC = () => 
  <div className="loader">
    {range(4).map(i => <div key={i}/>)}
  </div>