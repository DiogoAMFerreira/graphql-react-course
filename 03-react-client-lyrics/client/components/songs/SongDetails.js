import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import getSong from '../../queries/getSong'
import LyricCreate from '../lyrics/LyricCreate'
import LyricList from '../lyrics/LyricList'

class SongDetail extends Component {
    renderLoading() {
        return <div>Song Loading...</div>
    }
    renderNotFound() {
        return <div>Song not found...</div>
    }
    render() {
        if (this.props.data.loading === true) {
            return this.renderLoading()
        }

        const { song } = this.props.data
        if (!song) {
            return this.renderNotFound()
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricCreate songId={song.id} />
                <LyricList songId={song.id} />
            </div>
        )
    }
}

export default graphql(getSong, {
    options: (props) => {
        return { variables: { id: props.params.id } }
    },
})(SongDetail)
