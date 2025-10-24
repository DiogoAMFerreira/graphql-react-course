import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, hashHistory, Route, IndexRoute } from 'react-router'

import RequireAuth from './components/hoc/requireAuth'

import App from './components/App'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import Dashboard from './components/dashboard/Dashboard'

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
})

const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: (o) => o.id,
})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="login" component={LoginForm}></Route>
                    <Route path="signup" component={SignupForm}></Route>
                    <Route
                        path="dashboard"
                        component={RequireAuth(Dashboard)}
                    ></Route>
                </Route>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
