const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const axios = require("axios");
const mongojs = require("mongojs");

var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get('/',(req,res)=> {
  res.render('index');
});

router.get('/articles',(req,res)=> {
    res.render('articles');
});

  router.get("/scrape", function(req, res) {

    // First, we grab the body of the html with request
    request("https://www.apnews.com/", function(error,response,html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
          
      // Make emptry array for temporarily saving and showing scraped Articles.
      var scrapedArticles = {};
      // Now, we grab every h2 within an article tag, and do the following:
      $(".CardHeadline").each(function(i, element) {
  
        // Save an empty result object
        var result = {};

        console.log(result)
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).children("a").text();
  
        console.log("What's the result title? " + result.title);
        
        result.link = $(this).children("a").attr("href");
  
        scrapedArticles[i] = result; 
      });
  
      console.log("Scraped Articles object built nicely: " + scrapedArticles);
      
      var hbsArticleObject = {
          articles: scrapedArticles
      };
  
      res.render("index", hbsArticleObject);
  
    });
  });

module.exports = router;