'use client'

import { ApolloProvider } from '@apollo/client'
import { LocationProvider } from './location-context'
import { client } from '../data/apollo'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </LocationProvider>
  )
}