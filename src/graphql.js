var {graphql, buildSchema} = require("graphql");
import "isomorphic-fetch";
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    goodbye: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello: async () => {
        const result = await fetch("http://localhost:8000/hello", {
            method: "GET"
        });
        return result.text();

    },
    goodbye: async () => {
        const result = await fetch("http://localhost:8000/goodbye", {
            method: "GET"
        });
        return result.text();
    }
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, "{ hello, goodbye }", root).then((response) => {
    console.log(response);
});