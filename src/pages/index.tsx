import * as React from 'react'
import Layout from '../components/Layout'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Socials from '../components/Socials'

interface ProductEdge {
  node: {
    path: string;
    price?: number;
  }
}

interface FileEdge {
  node: {
    relativePath: string;
    childImageSharp: {
      fluid: { src: string }
    }
  }
}

interface Props {
  data: {
    allProductsJson: {
      edges: ProductEdge[]
    };

    allFile: {
      edges: FileEdge[]
    };
  }
}

const findCover = (edges: Array<FileEdge>, productName: string) => {
  const [edge] = edges.filter(({node}) => node.relativePath.indexOf(`${productName}/`) == 0 );
  return edge ? edge.node.childImageSharp.fluid.src: '';
}

const getProducts = ({data}: Response) =>
  data.allProductsJson.edges
    .map(({node}) => ({
      url: `/single/${node.path}`,
      cover: findCover(data.allFile.edges, node.path),
      sale: !!node.price
    }));


const IndexPage = (props: Response) => (
  <Layout>
    <About />
    <Socials />
    <Gallery products={getProducts(props)}/>
  </Layout>
)


export const query = graphql`query{
  allFile(filter: {relativePath: {regex: "/cover\\./"}}){
    edges{
      node{
        relativePath
        childImageSharp{
          fluid(quality:95){
            src
          }
        }
      }
    }
  }
  allProductsJson {
    edges {
      node {
        path
        price
      }
    }
  }
}
`;

export default IndexPage
