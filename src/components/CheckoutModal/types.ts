import { ShopItem } from '../../hooks/shop'

export interface Item {
  product: ShopItem
  count: number
}

export type Cart = Item[]
