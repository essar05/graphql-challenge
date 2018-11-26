import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient } from 'apollo-boost';
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from 'react-apollo';

const fakerQLClient = new ApolloClient({
    link: new HttpLink({uri: 'https://fakerql.com/graphql'}),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={fakerQLClient}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
