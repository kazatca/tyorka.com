import * as React from 'react'
import { AllProductsJson, AllFile } from '../types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import Shop from '../components/Shop'

const findCover = (resp: Response, productName: string) => {
  const [edge] = resp.data.allFile.edges.filter(({node}) => node.relativePath.indexOf(`${productName}/`) == 0 );
  return edge ? edge.node.childImageSharp.resize.src: '';
}

type Response = {
  data:
    AllFile<{
      relativePath: string
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }> &
    
    AllProductsJson<{
      id: number
      path: string
      price?: number
      tags?: string[]
      title: string
    }>
}

const getProducts = (resp: Response) =>
  resp.data.allProductsJson.edges[0].node.products
    .filter(node => !!node.price)
    .map(node => ({
      url: `/shop/${node.path}`,
      cover: findCover(resp, node.path),
      sale: !!node.price,
      title: node.title,
      price: node.price
    }));


const ShopPage = (props: Response) => (
  <Layout>
    <Shop products={getProducts(props)}/>
  </Layout>
)


export const query = graphql`query{
  allFile(filter: {relativePath: {regex: "/cover\\./"}}){
    edges{
      node{
        relativePath
        childImageSharp{
          resize(quality:95, height: 200, width: 200){
            src
          }
        }
      }
    }
  }
  allProductsJson {
    edges {
      node {
        products{
          id
          path
          price
          tags
          title
        }
      }
    }
  }
}
`;

export default ShopPage
