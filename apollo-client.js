import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://thegraph.com/hosted-service/subgraph/okhaimie-dev/test-nation3-colleretal-agreem",
  cache: new InMemoryCache(),
});

export default client;