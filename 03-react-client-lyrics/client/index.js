import './style/style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import App from './components/App'
import SongList from './components/songs/SongList'
import SongCreate from './components/songs/SongCreate'
import SongDetail from './components/songs/SongDetails'

const client = new ApolloClient({})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SongList}></IndexRoute>
                </Route>
                <Route path="songs/new" component={SongCreate} />
                <Route path="songs/:id" component={SongDetail} />
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
