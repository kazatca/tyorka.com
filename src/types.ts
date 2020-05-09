export interface AllProductsJson<P> {
  allProductsJson: {
    edges: {
      node:{
        products: P[]
      }
    }[]
  }
}

export interface AllFile<F>{
  allFile: {
    edges: {
      node: F
    }[]
  }
}

export type CheckoutFields = 'name' | 'email';

interface Image {
  src?: string | null
  width?: number | null
  height?: number | null
}

export interface Slide {
  id: string
  positionX: number
  positionY: number
  size: number
  original?: Image | null
  preview?: Image | null
}

export interface Product {
  id: string
  path: string
  title: string
  tags?: string[],
  slides?: Slide[]
  price?: number
}

export interface ProductsJson {
  products: Product[]
}