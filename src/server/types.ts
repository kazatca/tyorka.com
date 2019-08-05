export interface Slide {
  id: string
}

export interface Product {
  path: string
  title: string
  description: string
  price: number
  slides: Slide[]
}