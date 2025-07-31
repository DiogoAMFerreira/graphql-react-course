import React, { Component } from 'react'
import gql from 'graphql-tag' //GraphQL Tag is a helper that allows us to write query's inside a component file
import { graphql } from 'react-apollo'

class SongList extends Component {
    render() {
        if (this.props.data.loading === true) {
            return <div>Song List Loading...</div>
        }
        return <div>Song List:</div>
    }
}

//Query definitions:
const query = gql`
    {
        songs {
            title
        }
    }
`

//Similar sintax to Redux
export default graphql(query)(SongList)
