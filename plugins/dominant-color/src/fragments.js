import { graphql } from 'gatsby'

export const GatsbyImageDominantColor = graphql`
  fragment GatsbyImageDominantColor on FileDominantColor {
    color
  }
`
