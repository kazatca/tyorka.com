import * as React from 'react'
import * as b_ from 'b_'
import Slider from './components/MobileSlider';
import {Slide} from './types';

import './index.scss';

const b = b_.bind(null, 'single');

interface Props {
  pics: Slide[];
  title?: string;
  description?: string;
  price?: number;
}

class Single extends React.Component<Props> {

  render(){
    const { pics, title, description, price } = this.props;
    return (
      <section className={b()}>
        <Slider pics={pics} />
        <div className={b('title')}>{title}</div>
        <div className={b('description')}>{description}</div>
        {!!price && 
          <>
            <div className={b('price')}>Цена: <span>{price} Р</span></div>
            <button className={b('buy-btn')}>Купить</button>
          </>
        }
      </section>)
  }
}

export default Single;