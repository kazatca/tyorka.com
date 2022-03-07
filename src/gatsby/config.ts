import { ConfigSchema } from '../schemas/config'
import clientConfig from '../../config.json'
require('dotenv').config({ path: `.env` })

const { error } = ConfigSchema.validate(clientConfig)

if (error) {
  console.error(error.message)
  process.exit(-1)
}

const config = {
  siteMetadata: {
    title: `Tyorka`,
  },
  assetPrefix: `/${process.env.GATSBY_LNG}/`,
  flags: {
    // FAST_DEV: true,
    // PARALLEL_SOURCING: true,
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        useResolveUrlLoader: true,
        sassOptions: {
          includePaths: ['src'],
          ignoreOrder: true,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./gatsby-graphql.ts`,
        documentPaths: ['./src/**/*.ts'],
      },
    },
    'gatsby-plugin-graphql-loader',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Backend',
        fieldName: 'backend',
        url: process.env.GRAPHQL_URL,
        headers: {
          'X-Auth': process.env.BUILDER_TOKEN,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: process.env.GTM_ID,
        // enableWebVitalsTracking: true,
      },
    },
  ],
}

export default config
