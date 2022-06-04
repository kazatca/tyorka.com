import { useConfig } from '../hooks/config'

export type Size = 'small' | 'big'

const sizeToWidth: Record<Size, number> = {
  big: 2000,
  small: 600,
}

export const useImage = (
  src: string | undefined,
  size: Size = 'small',
  cropped = false
) => {
  if(!src) {
    return;
  }
  const [basename, ext] = src.split('.')
  const { imagesUrl } = useConfig()
  return `${imagesUrl}${basename}${cropped ? '_square' : ''}_${
    sizeToWidth[size]
  }.${ext}`
}
