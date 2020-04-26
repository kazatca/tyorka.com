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