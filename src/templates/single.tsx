import * as React from 'react'
import { graphql } from 'gatsby'
import Single from '../components/Single'
import {AllFile} from '../types';

type Data = 
  AllFile<{
    name: string;
    relativePath: string
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
  }>

interface Slide {
  id: string
  positionX: number
  positionY: number
  size: number
}

interface Props {
  pathContext: {
    id: number
    slug: string
    name: string
    title: string,
    description?: string
    price?: number
  }
  data: Data
}

const SinglePage = ({pathContext: {title, description, price, name}, data}: Props) => {
  return (
    <Single
      name={name}
      title={title}
      description={description}
      price={price}
    />);
}


export const query = graphql`
  query($slug: String!){
    allFile(filter: {relativeDirectory: {eq: $slug }, extension: { ne: "html" }}){
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
`;

const formatPics = (data: Data, slides: Slide[]) => data.allFile.edges.map(({node}) => {
  const name = node.relativePath.split('/')[1];
  const slideProps = slides.find(slide => slide.id === name);

  return {
    name,
    preview: node.childImageSharp.resize,
    original: node.childImageSharp.original,
    ...slideProps
  }
});

export default SinglePage;