import { CreatePagesArgs } from 'gatsby'
import { ProductsQuery } from '../../../gatsby-graphql'
import { Lng } from '../../types'

const lng = (process.env.GATSBY_LNG || 'ru') as Lng

export async function collectItems(graphql: CreatePagesArgs['graphql']) {
  const { data } = await graphql<ProductsQuery>(`
    query Products {
      backend {
        products {
          id
          title {
            en
            ru
          }
          descriptionHTML {
            en
            ru
          }
          descriptionText {
            en
            ru
          }
          price
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
          showInShop
          showInGallery
        }
      }
    }
  `)

  return (data?.backend.products || []).map(product => ({
    ...product,
    title: product.title?.[lng] || '',
    description: product.descriptionHTML?.[lng] || '',
    descriptionText: product.descriptionText?.[lng] || ''
  }))
}

type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type ProductItem = Awaited<ReturnType<typeof collectItems>>[number]
