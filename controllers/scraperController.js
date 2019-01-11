const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get('/',(req,res)=> {
    res.render('index');
});

router.get('/articles',(req,res)=> {
    res.render('articles');
});

module.exports = router;