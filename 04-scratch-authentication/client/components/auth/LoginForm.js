import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import LoginMutation from '../../mutations/Login'
import CurrentUserQuery from '../../queries/CurrentUser'

class LoginForm extends Component {
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
                const errorMessages = err.graphQLErrors.map(
                    ({ message }) => message
                )

                this.setState({ errors: errorMessages })
            })
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }
}

export default graphql(LoginMutation)(LoginForm)
