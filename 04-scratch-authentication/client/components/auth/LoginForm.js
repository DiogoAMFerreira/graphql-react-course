import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import LoginMutation from '../../mutations/Login'
import CurrentUserQuery from '../../queries/CurrentUser'
import { hashHistory } from 'react-router'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: [],
        }
    }

    // // Replacement in newer React versions (17+)
    // getSnapshotBeforeUpdate(prevProps) {
    //     prevProps //the old, current set of props
    //     this.props //the new set of props that will be in place when component rerenders
    // }

    componentWillUpdate(nextProps) {
        //this.props; //the old, current set of props
        //nextProps; //the new set of props that will be in place when component rerenders
        if (!this.props.data.currentUser && nextProps.data.currentUser) {
            console.log('Login successful!')
            // Redirect to dashboard after login
            hashHistory.push('/dashboard')
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
                <h3>Login</h3>
                <AuthForm
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}
                />
            </div>
        )
    }
}

export default graphql(CurrentUserQuery)(graphql(LoginMutation)(LoginForm))
