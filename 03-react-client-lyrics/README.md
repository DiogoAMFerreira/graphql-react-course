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

On a setup this simple. ApolloClient is our store and ApolloProvider is indeed the provider which in this case it's a React component
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

### Apollo Store

The Apollo store, or apollo client, has internal buckets of data. It knows how to fetch data from the GraphQL server and store it inside this buckets (cache) The Apollo knows exactly in which bucket to store the information because in each response from the GraphQL Server there's a \_\_typename field indicating the type of data it's fetching.

Here's an example of an object returned by the GraphQL server

```json
{
	{
		"id": "6887a75e5a8cba1b62e098bd",
		"content": "Peaches",
		"likes": 0,
		"__typename": "FruitType"
	}
}
```

But it doesn't know what data it has or what attributes exist inside that data. To fix this issue there's a piece of configuration that can be made in the Apollo Client to give each record an ID. This means that if any data within that record is changed then Apollo knows it has to refetch it.

For that in the Apollo Client setup the dataIdFromObject.
A very simple setup is the following:

```js
const client = new ApolloClient({
    dataIdFromObject: (obj) => obj.id,
})
```

This works well if tables have an unique id field, if that changes then we need to provide a custom function for each object type. Also it requires that the id is always fetched in any query we came. If we don't fetch that id then it can't map the records in the ApolloStore

More information can be found here: https://www.apollographql.com/docs/react/caching/cache-configuration

Also there's other ways to achieve the same goal

#### Optimistic UI Updates

When calling a mutation we can setup an "optimistic ui update" that is like telling the Apollo that we think that the response will be changed to that, instantly updating our React Application. This can be great to update the UI before a response is given by the server improving the UI experience for the user.

Apollo will use this guess that we give them to update temporarily it's Store while waiting for the real response from the server.

```js
onLike(id) {
	this.props.mutate({
		variables: { id },
		// Optimistic UI update
		optimisticResponse: {
			__typename: 'Mutation',
			likeLyric: {
				id: id,
				__typename: 'LyricType',
				likes:
					this.props.lyrics.find((lyric) => lyric.id === id)
						.likes + 1,
			},
		},
	})
}
```
