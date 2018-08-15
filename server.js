const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// var cors = require("cors");
const bodyParser = require("body-parser");

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

// Connect to the Mongo DB
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
);

// Start App on PORT
app.listen(PORT, function() {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
