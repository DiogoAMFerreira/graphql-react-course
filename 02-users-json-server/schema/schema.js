const { default: axios } = require('axios')
const graphql = require('graphql')
const { first } = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql

//Order of definition is very important so relations are linked through the types
//But sometimes you have circular references
//To deal with that you transform the fields option into an arrow function.
//This way it get's defined but not executed. This prevents that on this case UserType is called before it's defined

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios
                    .get(
                        `http://localhost:3000/users?companyId=${parentValue.id}`
                    )
                    .then((resp) => resp.data)
            },
        },
    }),
})

//We use company of type CompanyType in the UserType cause it's what's returned.
//But for the model it's companyId
//But for the UserType to return the company information we need to use the resolve function to populate the property
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                // console.log(parentValue, args);
                return axios
                    .get(
                        `http://localhost:3000/companies/${parentValue.companyId}`
                    )
                    .then((resp) => resp.data)
            },
        },
    }),
})

// Root Query is an entry point into our data
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    // The fields define that this RootQuery will return an user of type UserType by giving it the id of the user
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                //Axios result returns in response.data
                return axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then((resp) => resp.data)
            },
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/companies/${args.id}`)
                    .then((resp) => resp.data)
            },
        },
    },
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //User mutation to add a new user
        addUser: {
            type: UserType,
            args: {
                //The new GraphQLNonNull forces that when someone calls this mutation to add a User this field can't be null
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, { firstName, age }) {
                return axios
                    .post('http://localhost:3000/users', { firstName, age })
                    .then((res) => res.data)
            },
        },
        //User mutation to delete a existing user
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parentValue, { id }) {
                return axios
                    .delete(`http://localhost:3000/users/${id}`)
                    .then((res) => res.data)
            },
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString },
            },
            resolve(parentValue, { id, firstName, age, companyId }) {
                return axios
                    .patch(`http://localhost:3000/users/${id}`, {
                        firstName,
                        age,
                        companyId,
                    })
                    .then((res) => res.data)
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})
