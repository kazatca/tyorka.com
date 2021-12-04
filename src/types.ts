import { ProductsQuery, InstagramFeedQuery } from "../gatsby-graphql";

export type CheckoutFields = 'name' | 'email';

export interface Image {
  src?: string | null
  width?: number | null
  height?: number | null
}

export type ProductItem = ProductsQuery['backend']['products'][number]

export type Picture = ProductItem['pictures'][number]

export type Crop = Picture['crop']

export type Size = Picture['originalSize']