import * as React from 'react';
import {range} from 'lodash';

import './index.scss';

export const Loading: React.FC = () => 
  <div className="loader">
    {range(4).map(i => <div key={i}/>)}
  </div>