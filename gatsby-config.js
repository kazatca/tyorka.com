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
        ignore: [`.~*`, `${__dirname}/src/products/.~*`]
      },
    },
    'gatsby-plugin-typescript',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["src"]
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./gatsby-graphql.ts`,
        documentPaths: [
          './src/pages/*.{ts,tsx}',
          './src/templates/*.{ts,tsx}',
          './src/**/hooks.ts',
          './gatsby-node.js',
          './src/hooks/*.ts'
        ],
      }
    },
    'gatsby-plugin-graphql-loader'
  ],
}
