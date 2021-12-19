import { useStaticQuery, graphql } from "gatsby";
import { ShopQuery } from '../../gatsby-graphql';
import { Lng } from "../types";

const lng = (process.env.GATSBY_LNG || 'ru')  as Lng

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
          title {
            en
            ru
          }
          description {
            en
            ru
          }
        }
      }
    }
  `);

  const items = data.backend.shop || [];

  return {
    products: items.map(item => ({
      ...item,
      title: item.title?.[lng],
      description: item.description?.[lng]
    }))
  }
}

export type ShopItem = ReturnType<typeof useShop>['products'][number]