# Main GRAPHQL Javascript/Typescript clients for React

This list is ordered in complexity:

-   Lokka - As simple as possible. Basic queries, mutations. Some simple caching features.
-   Apollo Client/Apollo Stack - Produced by the same guys as Meteor JS. Good balance between features and complexity. It has both the backend GraphQL Server and a Frontend Client. Great to start and lot of features. But made by inexperienced programmers in GraphQL
-   Relay - Amazingly performance for mobile. By far the most insanely complex. Relay is officially used by Meta. Mutations are extra complex

# GraphQL Express / Apollo Server

GraphQL Express is refered as the reference GraphQL implementation of GraphQL. It is the official implementation.
Apollo Server is a different interpretation of GraphQl can be implemented on the server
Neither of them is better that the other.

It can be a preference decision

## GraphQL Express Schema File

```js
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return User.findById(args.id)
            },
        },
    }),
})
```

## Apollo Server

Apollo separetes it's server into two types of files:

-   Schemas
-   Resolvers

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
            return users
        },
    },
}
```

# Lyrical-GraphQL

Starter project from a GraphQL course on Udemy.com

### App Setup

-   Run `npm install --legacy-peer-deps` in the root of the project to install dependencies
-   Create a .env file based on the template.
-   Run `npm run dev`to start the application
-   Access the application at `localhost:4000` in your browser

### Hints not disapearing on GraphiQL

If in GraphiQL the hints aren't being removed automatically run the following code on the console

```js
setInterval(() => {
    document
        .querySelectorAll('.CodeMirror-hints-wrapper')
        .forEach((el) => el.remove())
}, 1000)
```

### GraphiQL Examples

```graphql


```

## Apollo Setup

Between the React App and the GraphQL Server are two very important pieces:

-   Apollo Store - This will communicate directly with the GraphQL Server and store data that comes from it. It's a client side repository of data that comes from GraphQL Store. This piece doesn't know nor care about the existance of the React App
-   Apollo Provider - The integration layer between the Apollo Store and the React application. The provider will collect data from the store and inject it into the application. The vast majority of configuration will be done in this layer.

The client and providder draws from redux world. So if you are familiar with those this will look similar

On a setup this simple. ApolloClient is our store and ApolloProver is indeed the provider which in this case it's a React component
If you don't provide any configuration on the ApolloClient it will assume that the GraphQL Server is on the same host but at /graphql

```js
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <div>Lyrical</div>
        </ApolloProvider>
    )
}
```
