import { useStaticQuery, graphql } from "gatsby";
import { CoversQuery } from '../../gatsby-graphql';

interface Img {
  src: string
  color: string
  width: number
  height: number
}

interface Cover {[path: string]: Img}

export const useCovers = () => {
  const data = useStaticQuery<CoversQuery>(graphql`
    query Covers {
      allFile(filter: {relativePath: {regex: "/cover\\./"}}){
        edges{
          node{
            relativePath
            colors {
              vibrant
              darkVibrant
              lightVibrant
              muted
              darkMuted
              lightMuted
            }
            childImageSharp{
              resize(quality:95, height: 600){
                src
                width
                height
              }
            }
          }
        }
      }
    }
  `);

  return data.allFile.edges.reduce((result, { node }) => {
    const path = node.relativePath.split('/')[0];
    result[path] = {
      src: node.childImageSharp?.resize?.src || '',
      width: node.childImageSharp?.resize?.width || 0,
      height: node.childImageSharp?.resize?.height || 0,
      color: node.colors?.lightMuted || 'white'
    }
    return result;
  }, {} as Cover);
}