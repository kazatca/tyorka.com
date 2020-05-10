import * as React from 'react';
import { range } from 'lodash';
import * as b_ from 'b_';

import './index.scss';

const b = b_.with('slider-edit-grid');

export const Grid: React.FC = () =>
  <div className={b()}>
    <table>
      <tbody>
        {range(3).map(i => (<tr>{range(3).map(j => <td />)}</tr>))}
      </tbody>
    </table>
  </div>