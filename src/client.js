import { ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: "https://api.uno.kg/graphql/",
  cache: new InMemoryCache(),
});