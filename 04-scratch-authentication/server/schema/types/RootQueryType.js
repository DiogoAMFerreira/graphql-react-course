const graphql = require('graphql')
const UserType = require('./UserType')
const { GraphQLObjectType } = graphql

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        currentUser: {
            type: UserType,
            resolve(parentValue, args, req) {
                return req.user
            },
        },
    },
})

module.exports = RootQueryType
