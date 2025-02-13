const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true, //Development tool that allows us to make queries against our development server
  })
);

const appPort = 4000;

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}`);
});
