# App requirements

List of things to do on this App and problems to overtake

-   Needs Landing Page
-   Needs Sigup page
-   Needs Sigin page
-   Needs to show multiple pages
-   Needs to store user data
-   Users shouldn't be able to see all details about other users
-   Needs to validate inputs
-   Need some solution for authentication

Will be a React application with Webpack, GraphQL, Express and MongoDB

Startup project came from: https://github.com/StephenGrider/auth-graphql-starter.git

## PassportJS for authentication

PassportJS isnt' a designed with GraphQL in mind but will try to use it for authentication

With Passport we get a request from a mystery user to authenticate. Passport will take the username look into the database and decide if the authentication request is valid, returning and saving a cookie for that user.
When using GraphQL there's two approaches to use PassportJS:

-   Decoupled Approach
-   Coupled Approach

In the Decoupled Approach we separate both the authentication on Passport and then GraphQL. Every request will first be checked by Passport and then proceed to GraphQL. This means that Passport will identify the user and send it forward to GraphQL, this means that when identified the user we expect a change in the application. A change can also be called a mutation. In this decoupled approach we don't get that behaviour of change/mutation between the status of being authenticated or not authenticated.

Pros:

-   Each service is it's own

Cons:

-   Our React App will have a split of the requests, basically like having two backend services

Cons:

In the Coupled Approach, we chain the authentication with GraphQL. So instead of instantly sending a request to Passport we first send a mutation request to GraphQL, giving the user and password to change the status from non authenticated to authenticated. GraphQL will see that request and pass it forward to Passport to validate it. Passport will still create a cookie, pass it on to GraphQL. From that moment forward any requests only go to GraphQL since it's already authenticated.

Pro:

-   Using GraphQL in the way it is intended, GraphQL is being used to deal with multiple services like it was designed for
-   Allows us to make a very straighforward service in backend for authentication

Cons:

-   Most services might not be setup to work well with GraphQL being Passport one of them which will require a lot of work. Look at signup and login function in server/auth.js

For this course the Coupled Approach was the choice since the startup project already did all the work on integrating Passport with GraphQL

### Logout with PassportJS

To log out using PassportJS there's an exposed method called `logout()` on `req` (It can also be `logOut()`) that can be called from any route handler which needs to terminate a login session. When it's invoked it removes the property `req.user` and clear the login session.

```js
app.get('/logout', function (req, res)) {
	req.logOut();
	res.redirect('/');
}

```

More documentation can be found in https://passportjs.org/docs

### Cookies

Make sure you include cookies on your requests when using GraphQL because Passport will need them to know if the user is authenticated.

This is a small configuration on the ApolloClient called networkInterface. You need to create your custom network interface. It can be something like this:

```
import ApolloClient, { createNetworkInterface } from 'apollo-client'

//...

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
        credentials: 'same-origin',
    },
})

const client = new ApolloClient({
	networkInterface,
    dataIdFromObject: (o) => o.id,
})

```

This networkInterface configuration can also be used to define a different URI for GraphQL. Defining this also means that Apollo stops using it's default values so it's important to define the URI even if it's the default one

### Race conditions

Be careful with `refetchQueries` and `.then` on the mutation process.
When you have both a `refetchQueries` setup and a `.then` in the mutation call both will be called at the same time. This can problematic for most situations. Imagine a login mutation where you call the query to load the user after a sucessful login and also have a redirect to the "Home" page. Since the navigation to the other page will probably be faster than the refetch then the page would try to load the Home page, see you aren't authenticated and send you back to the Login page.

In situations like this you need to handle it in a different way. One way is to associate the element with the query. When a query it's refetched the component will automatically rerender and we can use this to trigger changes in the component

# Setup

-   Run `npm install --legacy-peer-deps` in the root of the project to install dependencies
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
