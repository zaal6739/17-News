// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Requiring our Note and Article models

// Mongoose Promise
mongoose.Promise = Promise;

var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));//added express to logger 
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve static content
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/scraperController.js");
app.use("/", routes);
mongoose.connect("mongodb://heroku_pwg2gv2l:88v3iq0tnua7r09tmv6tsmgf7h@ds153814.mlab.com:53814/heroku_pwg2gv2l", { useNewUrlParser: true });


var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connected");
});

// Listen on port 8080
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});