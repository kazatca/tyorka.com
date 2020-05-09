import { useStaticQuery, graphql } from "gatsby";
import { SinglePagePicsQuery } from '../../../gatsby-graphql';
import { ProductsJson, Slide } from "../../types";
const { products }: ProductsJson = require('../../products/products.json');

export const usePics = (name: string): Slide[] => {
  const data = useStaticQuery<SinglePagePicsQuery>(graphql`
    query SinglePagePics{
      allFile(filter: {extension: {regex: "/jpg|png/"}}){
        edges{
          node{
            name
            relativePath
            childImageSharp{
              resize(height: 500, quality: 95){
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
    }
  `);

  const pics = data.allFile.edges
    .filter(({node}) => node.relativePath.startsWith(`${name}/`));

  const product = products.find(product => product.path === name);

  if(!product || !pics.length){
    return [];
  }

  const slideConfigs = product.slides || [];

  return pics.map(({node}) => {

    const slideConfig = slideConfigs.find(config => node.relativePath.endsWith(`/${config.id}`));

    return {
      id: node.relativePath,
      positionX: slideConfig?.positionX || 0,
      positionY: slideConfig?.positionY || 0,
      size: slideConfig?.size || 100,
      original: node.childImageSharp?.original,
      preview: node.childImageSharp?.resize
    }
  })
}