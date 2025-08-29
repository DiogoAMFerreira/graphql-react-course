import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../../queries/fetchSongs' //Importing the query we created
import deleteSongMutation from '../../mutations/deleteSong'

class SongList extends Component {
    onSongDelete(id) {
        this.props
            .mutate({
                variables: { id },
                // refetchQueries: [
                //     {
                //         query, // Refetching the song list after creating a new song
                //         variables: {}, // No variables needed for this query
                //     },
                // ],
            })
            .then(() => this.props.data.refetch()) // This is easier cause the query is on this component
    }

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
                            <Link to={`/songs/${song.id}`} key={song.id}>
                                <li key={song.id} className="collection-item">
                                    {song.title}
                                    <i
                                        className="material-icons"
                                        onClick={() => {
                                            this.onSongDelete(song.id)
                                        }}
                                    >
                                        delete
                                    </i>
                                </li>
                            </Link>
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

//Similar sintax to Redux
export default graphql(deleteSongMutation)(graphql(query)(SongList))

//We use two graphql calls because we are using two different queries/mutations
//The inner one is the first to be called, so it will provide the data prop to the component
//The outer one will provide the mutate prop to the component
