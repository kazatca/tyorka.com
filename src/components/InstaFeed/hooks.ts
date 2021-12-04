import { useStaticQuery, graphql } from 'gatsby'
import { InstagramFeedQuery } from '../../../gatsby-graphql'

export const useFeed = () => {
  const data = useStaticQuery<InstagramFeedQuery>(graphql`
    query InstagramFeed {
      backend {
        blog {
          color
          id
          src
          url
        }
      }
    }
  `)

  return {
    posts: data.backend.blog,
  }
}

export type InstaPost = ReturnType<typeof useFeed>['posts'][number]
