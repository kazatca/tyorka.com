import { useStaticQuery, graphql } from "gatsby";
import { SquareCoversQuery } from '../../gatsby-graphql';

interface Img {
  src: string
  color: string
  width: number
  height: number
}

interface Cover {[path: string]: Img}

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
                width
                height
              }
            }
            dominantColor {
              color
            }
          }
        }
      }
    }
  `);

  return data.allFile.edges.reduce((result, { node }) => {
    const path = node.relativePath.split('/')[0];
    result[path] = {
      src: node.childImageSharp?.resize?.src!,
      width: node.childImageSharp?.resize?.width!,
      height: node.childImageSharp?.resize?.height!,
      color: node.dominantColor?.color || 'white'

    };
    return result;
  }, {} as Cover);
}