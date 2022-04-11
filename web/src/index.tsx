import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import 'antd/dist/antd.css';
import './index.css';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authMiddlewareLink = new ApolloLink((operation, forward) => {
    const headers: { [key: string]: string } = {};
    const sessionStorageCurrentConnection = sessionStorage.getItem('currentConnection');
    if (sessionStorageCurrentConnection) headers.Authorization = `Bearer ${JSON.parse(sessionStorageCurrentConnection).jwt}`;
    operation.setContext({ headers });
    return forward(operation);
  }
);

const client = new ApolloClient({
  link: authMiddlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);