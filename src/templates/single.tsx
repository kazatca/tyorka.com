import * as React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/Layout'
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
    title: string,
    description?: string
    price?: number
    slides: Slide[]
  }
  data: Data
}

const SinglePage = ({pathContext: {id, title, description, price, slug, slides}, data}: Props) => {
  return (
    <Single
      slug={slug}
      pics={formatPics(data, slides)}
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