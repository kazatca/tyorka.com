import 'isomorphic-fetch';
import * as React from 'react'
import * as b_ from 'b_'
import Slider from '../Slider';
import { Slide } from '../../types';
import { useDescription } from '../../hooks/md';

import './index.scss';

const b = b_.with('single');

interface Props {
  name: string
  price?: number;
}

const Single: React.FC<Props> = ({ name }) => {
  const [zoomed, setZoomed] = React.useState<Slide | null>(null);

  const { title, html } = useDescription(name);

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
      <Slider name={name} />
      <section>
        <div className={b('title')}>{title}</div>
        <div className={b('description')} dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </section>);
}

export default Single;