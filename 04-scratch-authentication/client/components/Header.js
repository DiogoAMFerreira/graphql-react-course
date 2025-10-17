import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import CurrentUser from '../queries/CurrentUser'
import Logout from '../mutations/Logout'
import { Link } from 'react-router'

/**
 * Header component
 *
 * Class based component since we will add state and lifecycle methods later
 */
class Header extends Component {
    onLogout() {
        this.props.mutate({
            refetchQueries: [{ query: CurrentUser }],
        })
    }
    renderButtons() {
        const { loading, currentUser } = this.props.data

        if (loading) {
            return <div />
        }

        if (currentUser) {
            return (
                <li>
                    <a onClick={this.onLogout.bind(this)}>Logout</a>
                </li>
            )
        }
        return (
            <div>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </div>
        )
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="left brand-logo">
                        Home
                    </Link>
                    <ul className="right">{this.renderButtons()}</ul>
                </div>
            </nav>
        )
    }
}

export default graphql(Logout)(graphql(CurrentUser)(Header))
