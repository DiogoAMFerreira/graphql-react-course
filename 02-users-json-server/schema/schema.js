const { default: axios } = require("axios");
const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = graphql;

//Order of definition is very important so relations are linked through the types
//But sometimes you have circular references
//To deal with that you transform the fields option into an arrow function.
//This way it get's defined but not executed. This prevents that on this case UserType is called before it's defined

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users?companyId=${parentValue.id}`)
          .then((resp) => resp.data);
      },
    },
  }),
});

//We use company of type CompanyType in the UserType cause it's what's returned.
//But for the model it's companyId
//But for the UserType to return the company information we need to use the resolve function to populate the property
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((resp) => resp.data);
      },
    },
  }),
});

// Root Query is an entry point into our data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // The fields define that this RootQuery will return an user of type UserType by giving it the id of the user
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //Axios result returns in response.data
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((resp) => resp.data);
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => resp.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
