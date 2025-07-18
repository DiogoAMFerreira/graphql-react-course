# Main GRAPHQL Javascript/Typescript clients for React

This list is ordered in complexity:

- Lokka - As simple as possible. Basic queries, mutations. Some simple caching features.
- Apollo Client/Apollo Stack - Produced by the same guys as Meteor JS. Good balance between features and complexity. It has both the backend GraphQL Server and a Frontend Client. Great to start and lot of features. But made by inexperienced programmers in GraphQL
- Relay - Amazingly performance for mobile. By far the most insanely complex. Relay is officially used by Meta. Mutations are extra complex

# GraphQL Express / Apollo Server

GraphQL Express is refered as the reference GraphQL implementation of GraphQL. It is the official implementation.
Apollo Server is a different interpretation of GraphQl can be implemented on the server
Neither of them is better that the other.

It can be a preference decision

## GraphQL Express Schema File

```js
const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.findById(args.id);
      },
    },
  }),
});
```

## Apollo Server

Apollo separetes it's server into two types of files:

- Schemas
- Resolvers

### Schema file structure

```js
type User {
	id: ID!
	firstName: String
	age: Int
	company: Company
}

type Company {
	id: ID!
	name: String
	employees: [User]
}
```

### Resolver File Structure

```js
const resolveFunctions = {
  Query: {
    users() {
      return users;
    },
  },
};
```

# Lyrical-GraphQL

Starter project from a GraphQL course on Udemy.com

### Setup

- Run `npm install --legacy-peer-deps` in the root of the project to install dependencies
- Access the application at `localhost:4000` in your browser
