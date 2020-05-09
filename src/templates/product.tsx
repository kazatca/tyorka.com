import * as React from 'react'
import { graphql } from 'gatsby'
import { ProductImagesQuery } from '../../gatsby-graphql';
import Product from '../components/Product'
import Layout from '../components/Layout';
import { Slide } from '../server/types';

interface Props {
  pathContext: {
    id: string
    slug: string
    name: string
    description?: string
    price?: number
    slides: Slide[]
  }
  data: ProductImagesQuery
}

const ProductPage = ({
  pathContext: { id, name, price, slides },
  data,
}: Props) => {
  return (
    <Layout>
      <Product id={id} name={name} price={price} />
    </Layout>
  )
}

export const query = graphql`
  query ProductImages ($slug: String!) {
    allFile(
      filter: { relativeDirectory: { eq: $slug }, extension: { ne: "md" } }
    ) {
      edges {
        node {
          name
          relativePath
          childImageSharp {
            resize(height: 200, width: 200, quality: 95) {
              src
              width
              height
            }

            original {
              src
              width
              height
            }
          }
        }
      }
    }
  }
`

const formatPics = (data: ProductImagesQuery, slides: Slide[]) =>
  data.allFile.edges.map(({ node }) => {
    const name = node.relativePath.split('/')[1]
    const slideProps = slides.find(slide => slide.id === name)!

    const image = node.childImageSharp!;

    return {
      name,
      preview: image.resize!,
      original: image.original!,
      ...slideProps,
    }
  })

export default ProductPage
