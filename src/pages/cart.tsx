import * as React from 'react';
import { graphql } from 'gatsby';
import { AllProductsJson, AllFile } from '../types';
import Layout from '../components/Layout';
import Cart from '../components/Cart';

const CartPage: React.SFC<Response> = ({data}) => {
  return (
    <Layout>
      <Cart products={getProducts(data)} />
    </Layout>
  );
}

const findCover = (data: Response['data'], productName: string) => {
  const [edge] = data.allFile.edges.filter(({node}) => node.relativePath.indexOf(`${productName}/`) == 0 );
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
      id: string
      path: string
      price?: number
      tags?: string[]
      title: string
    }>
}

const getProducts = (data: Response['data']) =>
  data.allProductsJson.edges[0].node.products
    .filter(node => !!node.price)
    .map(node => ({
      id: node.id,
      url: `/shop/${node.path}`,
      cover: findCover(data, node.path),
      title: node.title,
      price: node.price
    }));

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

export default CartPage;