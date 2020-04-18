import * as React from 'react'
import { AllProductsJson, AllFile } from '../types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Socials from '../components/Socials'

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
    }>
}

const getProducts = (resp: Response) =>
  resp.data.allProductsJson.edges[0].node.products
    .map(node => ({
      url: `/single/${node.path}`,
      cover: findCover(resp, node.path),
      sale: !!node.price
    }));


const IndexPage = (props: Response) => (
  <Layout>
    {/* <About /> */}
    <Gallery products={getProducts(props)}/>
    <Socials />
  </Layout>
)


export const query = graphql`query{
  allFile(filter: {relativePath: {regex: "/cover\\./"}}){
    edges{
      node{
        relativePath
        childImageSharp{
          resize(quality:95, height: 200){
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
        }
      }
    }
  }
}
`;

export default IndexPage
