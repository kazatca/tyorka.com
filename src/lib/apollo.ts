import fetch from 'isomorphic-fetch'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'

export function createApolloClient(uri: string) {
  const httpLink = createHttpLink({
    fetch,
    uri,
    headers: {
      'Accept-Language': process.env.GATSBY_LNG || 'en',
    },
  })

  const apolloClient = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    link: httpLink,
  })

  return apolloClient
}
