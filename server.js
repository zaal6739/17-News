const express = require('express');
const app = express();
const expbs = require('express-handlebars');

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

app.engine('handlebars',expbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//routing
const routes = require("./controllers/scraperController.js");

app.use("/", routes);

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is listening at port',PORT);
});