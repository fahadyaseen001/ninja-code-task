import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL || 'https://enatega-multivendor.up.railway.app/graphql',
    }),
    cache: new InMemoryCache(),
});
