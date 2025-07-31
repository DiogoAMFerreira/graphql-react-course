import React, { Component } from 'react'
import gql from 'graphql-tag' //GraphQL Tag is a helper that allows us to write query's inside a component file
import { graphql } from 'react-apollo'

class SongList extends Component {
    renderLoading() {
        return <div>Song List Loading...</div>
    }
    render() {
        if (this.props.data.loading === true) {
            return this.renderLoading()
        }

        return (
            <div>
                Song List:
                {this.props.data.songs.map((song) => {
                    return <li>{song.title}</li>
                })}
            </div>
        )
    }
}

//Query definitions:
const query = gql`
    {
        songs {
            id
            title
        }
    }
`

//Similar sintax to Redux
export default graphql(query)(SongList)
