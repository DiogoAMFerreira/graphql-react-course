import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import likeLyric from '../../mutations/likeLyric'

class LyricList extends Component {
    onLike(id) {
        this.props.mutate({
            variables: { id },
            // Optimistic UI update
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes:
                        this.props.lyrics.find((lyric) => lyric.id === id)
                            .likes + 1,
                },
            },
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li className="collection-item" key={id}>
                    {content}
                    <div className="vote-box">
                        {likes}
                        <i
                            onClick={() => this.onLike(id)}
                            className="material-icons right"
                        >
                            thumb_up
                        </i>
                    </div>
                </li>
            )
        })
    }

    render() {
        return <ul className="collection">{this.renderLyrics()}</ul>
    }
}

export default graphql(likeLyric)(LyricList)
