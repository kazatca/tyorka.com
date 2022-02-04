import { useConfig } from '../hooks/config'

type Size = 'small' | 'big'

const sizeToWidth: Record<Size, number> = {
  big: 2000,
  small: 600
}

export const useImage = (src: string, size: Size = 'small') => {
  const [basename, ext] = src.split('.')  
  const { imagesUrl } = useConfig()
  return `${imagesUrl}${basename}_${sizeToWidth[size]}.${ext}`
}
