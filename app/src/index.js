import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './misc/serviceWorker';
import {BrowserRouter as Router} from "react-router-dom";

// 1
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';

// 2
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_JCONTENT_GQL_ENDPOINT
});

// 3
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


// 4
ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App/>
        </Router>,
    </ApolloProvider>,
    document.getElementById('root')
);
serviceWorker.unregister();