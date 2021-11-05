import { ShopQuery } from '../../../gatsby-graphql'

export type Product = ShopQuery['backend']['products'][number]