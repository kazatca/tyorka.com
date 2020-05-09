module.exports = {
  siteMetadata: {
    title: `Title from siteMetadata`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/src/products/`,
        ignore: [`.~*`, `${__dirname}/src/products/.~*`]
      },
    },
    'gatsby-transformer-remark',
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
          './src/templates/*.{ts,tsx}',
          './src/**/hooks.ts',
          './src/hooks/*.ts'
        ],
      }
    },
    'gatsby-plugin-graphql-loader'
  ],
}
