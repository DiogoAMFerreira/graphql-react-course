import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import addLyricToSong from '../../mutations/addLyricToSong'
class LyricCreate extends Component {
    constructor(props) {
        super(props)
        this.state = { content: '' }
    }

    onSubmit(event) {
        event.preventDefault()

        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.content,
            },
            // It's important to refetch the song query to update the list of lyrics
            // after adding a new lyric. We can do this by specifying the name of the query or
            // by using a piece of configuration to tell Apollo Store the identity of the objects and refetch a specific object with its id
            // refetchQueries: [{
        })
        // Clear the input
        this.setState({ content: '' })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input
                    onChange={(event) =>
                        this.setState({ content: event.target.value })
                    }
                    value={this.state.content}
                />
            </form>
        )
    }
}

export default graphql(addLyricToSong)(LyricCreate)
