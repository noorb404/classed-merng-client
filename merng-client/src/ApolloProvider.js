

import React from 'react';
import App from './App';
import {ApolloClient}from 'apollo-client';

import { InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink } from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import {WebSocketLink} from  '@apollo/client/link/ws';
import {split, ApolloLink } from "@apollo/client";
import { getMainDefinition } from 'apollo-utilities';




const httpLink = createHttpLink({
    uri:  'https://evening-sea-33836.herokuapp.com/'
});


const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
);
const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers:{
            Authorization : token ? `Bearer ${token}` : ''
        }
    }
})


const client = new ApolloClient({
    link: authLink.concat(ApolloLink.from([splitLink])),
    cache: new InMemoryCache()
});



export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
