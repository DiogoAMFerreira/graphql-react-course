const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql

//Mutations:
// SignupUser
// LoginUser or SiginUser
// LogoutUser or SignoutUser

// Curiosity: Signin vs Login
// Signin: Usually used for more common public platforms where users can create accounts and access services.
// Login: Usually used for more formal or secure systems, such as corporate networks, banking platforms, or enterprise applications.

// Not including password for security reasons. No need to ever send or display a password for a user

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        email: { type: GraphQLString },
    },
})

module.exports = UserType
