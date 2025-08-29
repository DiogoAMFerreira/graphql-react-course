import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import getSong from '../../queries/getSong'

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
                <h3>{song.title}</h3>
            </div>
        )
    }
}

export default graphql(getSong, {
    options: (props) => {
        return { variables: { id: props.params.id } }
    },
})(SongDetail)
