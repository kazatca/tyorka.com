import { useConfig } from '../hooks/config'
export const useImage = (src: string) => {
  const { imagesUrl } = useConfig()
  return `${imagesUrl}${src}`
}
