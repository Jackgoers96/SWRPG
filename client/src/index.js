import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App'
// import { Provider } from 'react-redux';
// import store from './redux/store';
const client = new ApolloClient({
  uri: 'localhost:3000',
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(document.getElementById('root'));

// const container = document.getElementById('root');

// const root = ReactDOM.createRoot(container);

root.render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
