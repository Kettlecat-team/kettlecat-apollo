const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// var cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const authRouter = require("./services/routes/routes");

// defining the port for the app to listen to
var PORT = process.env.PORT || 5000;

// URI for Mongo
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/kettlecat-2";

// Initialize Express
var app = express();

// Configure middleware

// use body-parser to get json out of requests (in req.json())
app.use(bodyParser.json());

// TODO configure CORS
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "https://kettlecat-team.github.io"],
//     credentials: true
//   })
// );
// app.options("*", cors());

// Use morgan logger for logging requests
app.use(logger("dev"));

// authentication middleware
app.use(
  require("express-session")({
    secret: "chat bouilloire",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// auth routes
app.use("/auth", authRouter);

// linking to User in Mongoose
var User = require("./services/models/User");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Mongo DB
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// TODO typeDefs and resolvers to modularize
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world"
  }
};

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers
});

// telling the app to use Apollo to process requests.
server.applyMiddleware({ app });

// Start App on PORT
app.listen(PORT, function() {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
