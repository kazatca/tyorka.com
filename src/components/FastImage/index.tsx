import * as React from 'react'
import * as b_ from 'b_';
import { btoa } from 'isomorphic-base64'
import { useImage, Size } from '../../hooks/image'

import './index.scss';

const b = b_.with('fast-image');

interface Props extends Omit<React.HTMLProps<HTMLImageElement>, 'size'> {
  color: string
  src: string
  size?: Size
  cropped?: boolean
}

export const Image: React.FC<Props> = ({
  className,
  color,
  src,
  width = 1,
  height = 1,
  size = 'small',
  cropped = false
}) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="${color}" width="${width}" height="${height}"/></svg>`
  const back = `data:image/svg+xml;base64,${btoa(svg)}`;

  const source = useImage(src, size, cropped);

  const [loaded, setLoaded] = React.useState<string | undefined>();

  React.useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLoaded(source);
    img.onerror = () => setLoaded(source);
    img.src = source || '';
  }, [])

  return (
    <div className={`${b()} ${className || ''}`}>
      <img src={back} className={b('back')}/>
      <img src={loaded} className={b('image', {loaded: !!loaded})} />
    </div>
  )
}
