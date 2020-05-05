import { useStaticQuery, graphql } from "gatsby";
import { SquareCoversQuery } from '../../gatsby-graphql';

interface Cover {[path: string]: string}

export const useSquareCovers = () => {
  const data = useStaticQuery<SquareCoversQuery>(graphql`
    query SquareCovers {
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
    }
  `);

  return data.allFile.edges.reduce((result, { node }) => {
    const path = node.relativePath.split('/')[0];
    result[path] = node.childImageSharp?.resize?.src!;
    return result;
  }, {} as Cover);
}