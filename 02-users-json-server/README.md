# Setup

Continuing from the original setup in 01-users

To start the application execute the following command:

```sh
node server.js
```

This will start the application on the configured port (Set to 4000 on the example)

Open the application in the browser at http://localhost:4000/graphql

## Nodemon for development mode

Installed nodemon and created a command to help development

```sh
npm install --save nodemon
```

Run the code with the dev command

```sh
npm run dev
```

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

# Query examples

Example of complex query using fragments so it's not necessary to rewrite the wanted properties:

```graphql
query {
  google: company(id: "1") {
    ...companyDetails
  }
  microsoft: company(id: "3") {
    ...companyDetails
  }
}

fragment companyDetails on Company {
  name
  description
  users {
    firstName
    company {
      id
      name
      users {
        id
      }
    }
  }
}
```

## Mutations

A Mutation query is split in 2 parts:

- The first part refers to the change and the fields
- The second part refers to the returning fields

Example:

```graphql
{
  "data": {
    "addUser": {
      "id": "a6cc",
      "firstName": "Steven",
      "age": 23
    }
  }
}
```

# Final GraphiQL

```graphql
# Welcome to GraphiQL
#
# GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#

mutation {
  #addUser(firstName: "Steven", age: 23) {
  #  id
  #  firstName
  #  age
  #}
  #deleteUser(id: "22") {
  #  id
  #  firstName
  #  age
  #}
  editUser(firstName: "Steve", age: 25, id: "30") {
    id
    firstName
    age
  }
}

#query {
#  google: company(id: "1") {
#		...companyDetails
#  },
#  microsoft: company(id: "3") {
#  	...companyDetails
#  }
#}

#fragment companyDetails on Company {
#    name,
#    description,
#    users {
#      firstName
#      company {
#        id
#        name
#        users {
#          id
#        }
#      }
#    }
#}
```
