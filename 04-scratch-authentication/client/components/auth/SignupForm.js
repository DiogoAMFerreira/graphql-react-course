import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import SignupMutation from '../../mutations/Signup'
import CurrentUserQuery from '../../queries/CurrentUser'

class SignupForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: [],
        }
    }

    onSubmit({ email, password }) {
        this.props
            .mutate({
                variables: { email, password },
                refetchQueries: [{ query: CurrentUserQuery }],
            })
            .catch((err) => {
                const errors = err.graphQLErrors.map(({ message }) => message)

                this.setState({ errors })
            })
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}
                />
            </div>
        )
    }
}

export default graphql(SignupMutation)(SignupForm)
