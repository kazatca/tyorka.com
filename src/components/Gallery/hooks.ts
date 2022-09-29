import { useStaticQuery, graphql } from 'gatsby'
import { GalleryQuery } from '../../../gatsby-graphql'

export const useGallery = () => {
  const data = useStaticQuery<GalleryQuery>(graphql`
    query Gallery {
      backend {
        gallery {
          id
          cover {
            id
            src
            color
            originalSize {
              width
              height
            }
          }
        }
      }
    }
  `)

  return {
    gallery: data.backend.gallery,
  }
}
