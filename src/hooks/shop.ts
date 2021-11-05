import { useStaticQuery, graphql } from "gatsby";
import { ShopQuery } from '../../gatsby-graphql';

export const useShop = () => {
  const data = useStaticQuery<ShopQuery>(graphql`
    query Shop {
      backend {
        shop {
          id
          price
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
              width
              height
            }
          }
          title
          description
        }
      }
    }

  `);

  return {
    products: data.backend.shop 
  }
}

export type ShopItem = ReturnType<typeof useShop>['products'][number]