import * as React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { InstagramQuery } from '../../gatsby-graphql'
import { InstaFeed } from '../components/InstaFeed'

type Props = {
  data: InstagramQuery
}

export default ({ data }: Props) => {
  const posts = data.instagram.nodes.map(post => ({
    id: post.id,
    src: post.localFile?.childImageSharp?.resize?.src || '',
    color: post.localFile?.dominantColor?.color || 'white'
  }))
  return (
    <Layout>
      <InstaFeed posts={posts} />
    </Layout>
  )
}

export const query = graphql`
  query Instagram {
    instagram: allInstaNode(
      sort: { fields: timestamp, order: DESC }
      limit: 30
    ) {
      nodes {
        caption
        id
        preview
        localFile {
          dominantColor {
            color
          }
          childImageSharp {
            resize(quality: 100, width: 300, height: 300,cropFocus: CENTER) {
              src
            }
          }
        }
      }
    }
  }
`
