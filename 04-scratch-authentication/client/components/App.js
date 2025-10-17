import React from 'react'
import Header from './Header'

/**
 * Functional component since we don't need state or lifecycle methods for now
 */
const App = (props) => {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )
}

export default App
