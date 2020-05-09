import * as React from 'react'
import * as b_ from 'b_'
import 'isomorphic-fetch';
import { useSelector } from 'react-redux';
import Slider from './components/MobileSlider';
import Zoom from './components/MobileZoom';
import { Slide } from '../../types';
import { usePics } from './hooks';
import { useDescription } from '../../hooks/md';
import { RootState } from '../../state/reducer';

import './index.scss';

const b = b_.with('single');

interface Props {
  name: string
  price?: number;
}

const Single: React.SFC<Props> = ({ name }) => {
  const [zoomed, setZoomed] = React.useState<Slide | null>(null);

  const lng = useSelector((state: RootState) => state.app.locale);
  
  const { title, html } = useDescription(name, lng);

  const pics = usePics(name);

  const zoom = (pic: Slide) => {
    setZoomed(pic);
    window.history.pushState('zoomed', '', null);
  }

  const unzoom = (e: PopStateEvent) => {
    if (e.state !== 'zoomed') {
      setZoomed(null);
    }
  }

  React.useEffect(() => {
    const origOnPopState = window.onpopstate;
    window.onpopstate = unzoom;

    return () => {
      window.onpopstate = origOnPopState;
    }
  })

  return (
    <section className={b()}>
      <Slider
        pics={pics}
        onClick={pic => zoom(pic)}
      />
      {zoomed &&
        <Zoom
          {...zoomed.original}
          onClose={() => window.history.back()}
        />
      }
      <div className={b('title')}>{title}</div>
      <div className={b('description')} dangerouslySetInnerHTML={{ __html: html }} />
    </section>);
}

export default Single;