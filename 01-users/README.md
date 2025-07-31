# Setup

## Step 1 - Create a new application

Create a node app:

```sh
npm init
```

Use all default answers as they aren't important

Then installed 4 packages:

-   Expresss - Responsible with handling HTTP requests and sending responses back to the user
-   Express-GraphQL - Compatibility layer for Express with GraphQL
-   GraphQL - GraphQL librabry used to crawl through the data
-   Lodash - Utility package

```sh
npm install --save express express-graphql graphql lodash
```

Created the server.js file

## Step 2 - Start the application

To start the application execute the following command:

```sh
node server.js
```

This will start the application on the configured port (Set to 4000 on the example)

Open the application in the browser at http://localhost:4000/graphql
