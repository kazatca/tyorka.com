import { CreatePagesArgs } from "gatsby";
import { ProductsQuery} from '../../../gatsby-graphql'

export async function collectItems(graphql: CreatePagesArgs['graphql']) {
  const { data } = await graphql<ProductsQuery>(`
    query Products {
      backend {
        products {
          id
          title
          pictures {
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

  return data?.backend.products || []
}
