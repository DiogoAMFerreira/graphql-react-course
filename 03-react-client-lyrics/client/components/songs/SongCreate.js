import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { hashHistory, Link } from 'react-router'

class SongCreate extends Component {
    constructor(props) {
        super(props)

        this.state = { title: '' }
    }

    onSubmit(event) {
        event.preventDefault()

        this.props
            .mutate({
                variables: {
                    title: this.state.title,
                },
                refetchQueries: [
                    {
                        query: gql`
                            {
                                songs {
                                    id
                                    title
                                }
                            }
                        `,
                    },
                ],
            })
            .then(() => hashHistory.push('/'))
            .catch((error) => {
                console.error('Error creating song:', error)
            })
    }

    render() {
        return (
            <div>
                <Link to="/" className="btn-floating btn-large blue right">
                    <i className="material-icons">arrow_left</i>
                </Link>
                <h3>Create a new song!</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Enter song title:</label>
                    <input
                        onChange={(event) =>
                            this.setState({ title: event.target.value })
                        }
                        value={this.state.title}
                    />
                </form>
            </div>
        )
    }
}
//Query definitions:
const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`

export default graphql(mutation)(SongCreate)
