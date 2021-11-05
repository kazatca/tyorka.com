import { useStaticQuery, graphql } from "gatsby";
import { ShopQuery } from '../../../gatsby-graphql';


export const useShop = () => {
  const data = useStaticQuery<ShopQuery>(graphql`
    query Shop {
      backend {
        products {
          id
          title
          cover {
            src
            crop {
              anchor {
                x
                y
              }
              factor
            }
            color
            originalSize {
              height
              width
            }
          }
        }
      }
    }
  `);

  return {
    products: data.backend.products 
  }
}