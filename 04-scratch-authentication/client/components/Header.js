import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import CurrentUser from '../queries/CurrentUser'

/**
 * Header component
 *
 * Class based component since we will add state and lifecycle methods later
 */
class Header extends Component {
    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        }

        console.log(this.props.data)
        return <div>Header</div>
    }
}

export default graphql(CurrentUser)(Header)
