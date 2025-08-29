import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../../queries/fetchSongs' //Importing the query we created

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
export default graphql(query)(SongList)
