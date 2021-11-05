import { useStaticQuery, graphql } from "gatsby";
import { GalleryQuery } from '../../../gatsby-graphql';


export const useGallery = () => {
  const data = useStaticQuery<GalleryQuery>(graphql`
    query Gallery {
      backend {
        gallery {
          id
          src
          width
          height
          color
        }
      }
    }
  `);

  return {
    gallery: data.backend.gallery 
  }
}