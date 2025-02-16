'use client'

import { ApolloProvider } from '@apollo/client'
import { LocationProvider } from '@/app/contexts/location-context'
import { client } from '@/app/data/apollo'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </LocationProvider>
  )
}