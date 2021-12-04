require("dotenv").config({ path: `.env` })

const config = {
  siteMetadata: {
    title: `Tyorka`,
  },
  flags: {
    // FAST_DEV: true,
    // PARALLEL_SOURCING: true,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `products`,
        path: `${__dirname}/../products/`,
        ignore: [`.~*`, `${__dirname}/../products/.~*`]
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        useResolveUrlLoader: true,
        sassOptions: {
          includePaths: ["src"],
          ignoreOrder: true,
        }
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
          './src/hooks/*.ts',
          './src/**/*.ts'
        ],
      }
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `tyorka`,
        access_token: process.env.FB_API_KEY,
        instagram_id: process.env.INSTAGRAM_BUSINESS_ACCOUNT,
        paginate: 10,
        maxPosts: 10,
      },
    },
    'gatsby-plugin-graphql-loader',
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Backend",
        fieldName: "backend",
        url: "http://localhost:3000/graphql",
        headers: {
          "X-Auth": process.env.BUILDER_TOKEN,
        },
      },
    },
  ],
}

module.exports = config;