require("dotenv").config({path: `.env`})

module.exports = {
  siteMetadata: {
    title: `Tyorka`,
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
    'gatsby-plugin-typescript-checker',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["src"]
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'dominant-color',
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./gatsby-graphql.ts`,
        documentPaths: [
          './src/pages/*.tsx',
          './src/**/hooks.ts',
          './src/hooks/*.ts'
        ],
      }
    },

    'gatsby-plugin-graphql-loader',
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `tyorka`,
        access_token: process.env.FB_API_KEY,
        instagram_id: process.env.INSTAGRAM_BUSINESS_ACCOUNT,
        paginate: 100,
        maxPosts: 1000,
      },
    }
  ],
}
