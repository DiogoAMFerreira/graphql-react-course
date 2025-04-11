const { default: axios } = require("axios");
const { response } = require("express");
const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});

// Root Query is an entry point into our data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // The fields define that this RootQuery will return an user of type UserType by giving it the id of the user
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      // Resolve function purpose is the function that looks into the database to find the data based on the arguments
      // - parentValue - Usually not used
      // - args - The arguments sent to the query. In this case the args objects is expected to have an id
      resolve(parentValue, args) {
        //Axios result returns in response.data
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
