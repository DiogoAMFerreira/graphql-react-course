import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../../queries/fetchSongs' //Importing the query we created
import deleteSongMutation from '../../mutations/deleteSong'

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

//Similar sintax to Redux
export default graphql(deleteSongMutation)(graphql(query)(SongList))

//We use two graphql calls because we are using two different queries/mutations
//The inner one is the first to be called, so it will provide the data prop to the component
//The outer one will provide the mutate prop to the component
