import * as React from 'react'
import * as b_ from 'b_'
import 'isomorphic-fetch';
import Slider from './components/MobileSlider';
import Zoom from './components/MobileZoom';
import {Slide} from './types';

import './index.scss';

const b = b_.with('single');

interface Props {
  slug: string
  pics: Slide[];
  title?: string;
  description?: string;
  price?: number;
}

interface State {
  zoomed?: Slide
}

class Single extends React.Component<Props, State> {

  state: State ={};

  render(){
    const { slug, pics, title, description, price } = this.props;
    const { zoomed } = this.state;

    return (
      <section className={b()}>
        <Slider
          pics={pics}
          slug={slug}
          onClick={pic => this.zoom(pic)}
        />
        {zoomed &&
          <Zoom
            {...zoomed.original}
            onClose={() => window.history.back()}
          />
        }
        <div className={b('title')}>{title}</div>
        <div className={b('description')} dangerouslySetInnerHTML={{__html: description || ''}} />
        {!!price && 
          <>
            <div className={b('price')}>Цена: <span>{price} Р</span></div>
            <button className={b('buy-btn')}>Купить</button>
          </>
        }
      </section>);
  }

  private zoom(pic: Slide){
    this.setState({zoomed: pic});
    window.history.pushState('zoomed', '', null);
  }

  private onUnzoom = (e: PopStateEvent) => {
    if(e.state !== 'zoomed'){
      this.setState({zoomed: undefined});
    }
  }

  componentDidMount(){
    window.onpopstate = this.onUnzoom;
  }
}

export default Single;