import React, { Component } from 'react'
import gql from 'graphql-tag' //GraphQL Tag is a helper that allows us to write query's inside a component file
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

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
                <ul className="collection">
                    {this.props.data.songs.map((song) => {
                        return (
                            <li key={song.id} className="collection-item">
                                {song.title}
                            </li>
                        )
                    })}
                </ul>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

//Query definitions:
const query = gql`
    query {
        songs {
            id
            title
        }
    }
`

//Similar sintax to Redux
export default graphql(query)(SongList)
