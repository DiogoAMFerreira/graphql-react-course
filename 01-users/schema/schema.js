const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql

const users = [
    { id: '22', firstName: 'John', age: 21 },
    { id: '31', firstName: 'Mary', age: 24 },
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    },
})

// Root Query is an entry point into our data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // The fields define that this RootQuery will return an user of type UserType by giving it the id of the user
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            // Resolve function purpose is the function that looks into the database to find the data based on the arguments
            // - parentValue - Usually not used
            // - args - The arguments sent to the query. In this case the args objects is expected to have an id
            resolve(parentValue, args) {
                // In this example code it's going to be hardcoded data instead of a database
                // Using Lodash to search the data more easily
                return _.find(users, { id: args.id })
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})
