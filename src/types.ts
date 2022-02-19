import { ProductItem } from "./gatsby/context/products";

export type CheckoutFields = 'name' | 'email';

export interface Image {
  src?: string | null
  width?: number | null
  height?: number | null
}

export type Picture = ProductItem['pictures'][number]

export type Crop = Picture['crop']

export type Size = Picture['originalSize']

export type Lng = 'en' | 'ru'