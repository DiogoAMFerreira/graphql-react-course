import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import CurrentUser from '../queries/CurrentUser'

/**
 * Header component
 *
 * Class based component since we will add state and lifecycle methods later
 */
class Header extends Component {
    renderButtons() {
        const { loading, currentUser } = this.props.data

        if (loading) {
            return <div />
        }

        if (currentUser) {
            return <div>Logout</div>
        }
        return (
            <ul>
                <li>Signup</li>
                <li>Login</li>
            </ul>
        )
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">{this.renderButtons()}</div>
            </nav>
        )
    }
}

export default graphql(CurrentUser)(Header)
