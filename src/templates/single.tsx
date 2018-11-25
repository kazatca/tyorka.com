import * as React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import Single from '../components/Single'

interface Response {
  allFile: {
    edges: {
      node: {
        name: string;
        childImageSharp: {
          resize: {
            src: string;
            width: number;
            height: number;
          }
          original: {
            src: string;
            width: number;
            height: number;
          }
        }
      }
    }[]
  }
  allProductsJson: {
    edges: {
      node: {
        title?: string;
        description?: string;
        price?: number
      }
    }[]
  }
}

interface Props {
  data: Response;
}

const SinglePage = ({ data }: Props) => (
  <Layout>
    <Single
      pics={formatPics(data)}
      title={data.allProductsJson.edges[0].node.title}
      description={data.allProductsJson.edges[0].node.description}
      price={data.allProductsJson.edges[0].node.price}
    />
  </Layout>
)


export const query = graphql`
  query($slug: String!){
    allFile(filter: {relativeDirectory: {eq: $slug }}){
      edges{
        node{
          name
          childImageSharp{
            resize(height: 500){
              src
              width
              height
            }

            original{
              src
              width
              height
            }
          }
        }
      }
    }
    allProductsJson(filter: {path: {eq: $slug}}){
      edges {
        node {
          title
          description
          price
        }
      }
    }
  }
`;

const formatPics = (data: Response) => data.allFile.edges.map(({node}) => ({
  name: node.name,
  preview: node.childImageSharp.resize,
  original: node.childImageSharp.original
}));

export default SinglePage;