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
const JWTDXToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJodHRwOi8vamFoaWEuY29tIiwic3ViIjoiYXBpIHZlcmlmaWNhdGlvbiIsInJlZmVyZXIiOlsiaHR0cDovL3dvcmRwcmVzcy5sb2NhbCJdLCJpc3MiOiJkeCIsInNjb3BlcyI6WyJ3b3JkcHJlc3MiXSwiaWF0IjoxNjQ0MjQyNjY2LCJpcHMiOlsiMTI3LjAuMC4xIl0sImp0aSI6ImYyNTRkOWMzLTEwNDktNDQxOC04NDkwLWU4ZTQ3MDMzYzMzNyJ9.s933JfsPUSm3gYFDUCRiyJoK9V5SyMCKjmjx3R8fZQU";
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    headers: {
        'Authorization': `Bearer ${JWTDXToken}`
    }
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