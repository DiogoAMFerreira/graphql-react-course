import React, { Component } from 'react'
import AuthForm from './AuthForm'
import { graphql } from 'react-apollo'
import LoginMutation from '../../mutations/Login'

class LoginForm extends Component {
    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm />
            </div>
        )
    }
}

export default graphql(LoginMutation)(LoginForm)
