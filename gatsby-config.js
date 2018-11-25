module.exports = {
  siteMetadata: {
    title: `Title from siteMetadata`,
  },
  plugins: [
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/src/products/`,
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
}
