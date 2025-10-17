const graphql = require('graphql')
const { GraphQLSchema } = graphql

const RootQueryType = require('./types/RootQueryType')
const mutation = require('./mutations')

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation,
})
