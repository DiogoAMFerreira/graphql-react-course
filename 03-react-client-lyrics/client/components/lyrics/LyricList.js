import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import likeLyric from '../../mutations/likeLyric'

class LyricList extends Component {
    onLike(id) {
        this.props.mutate({
            variables: { id },
        })
    }

    renderLyrics() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li className="collection-item" key={id}>
                    {content}
                    <div>
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
