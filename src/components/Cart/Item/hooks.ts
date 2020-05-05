import { graphql, useStaticQuery } from "gatsby"
import {CartItemImageQuery} from '../../../../gatsby-graphql';

export const useCover = (name: string) => {
  const data = useStaticQuery<CartItemImageQuery>(graphql`
    query CartItemImage {
      allFile(filter: {relativePath: {regex: "/cover\\./"}}){
        edges{
          node{
            relativePath
            childImageSharp {
              resize(quality:95, height: 200, width: 200){
                src
              }
            }
          }
        }
      }
    }
  `);

  const edge = data.allFile.edges.find(({ node }) => node.relativePath.startsWith(`${name}/`));
  
  return edge?.node.childImageSharp?.resize?.src || '';
}