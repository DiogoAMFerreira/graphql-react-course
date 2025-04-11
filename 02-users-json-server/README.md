# Setup

Continuing from the original setup in 01-users

To start the application execute the following command:

```sh
node server.js
```

This will start the application on the configured port (Set to 4000 on the example)

Open the application in the browser at http://localhost:4000/graphql

## Step 1 - Setup a Demo API with JSON Server

This is a really small fake API to serve some data

https://github.com/typicode/json-server/tree/v0

Follow the Readme of it's Github page:

### Install the JSON Server library

```sh
npm install json-server@latest
```

### Update the routes and data

To change or add data to this API server change the db.json file

### Run the JSON Server

To run the JSON Server a command was added to the package.json file
Run it paralel with the application

## Step 2 - Install Axios to access the JSON Server API

```sh
npm install --save axios
```
