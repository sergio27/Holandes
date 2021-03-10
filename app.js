const express = require("express");
const https = require("https");
const fs = require('fs');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {

  fs.readFile('./public/docs/words.json', 'utf8', (err, jsonString) => {
      if (err) {
          console.log("File read failed:", err)
          return
      }
      const allWords = JSON.parse(jsonString);
      const categories = [];

      allWords.forEach(function(word) {
          let category = word.category;

          if(!categories.includes(category)) {
            categories.push(category);
          }
      });

      res.render("index", {words: allWords, categories: categories.sort()});
  })
});

app.get("/:category", function(req, res) {
      res.render("category", {category: req.params.category});
});

app.get("/:category/Vocabulario", function(req, res) {

  fs.readFile('./public/docs/words.json', 'utf8', (err, jsonString) => {
      if (err) {
          console.log("File read failed:", err)
          return
      }

      const allWords = JSON.parse(jsonString);
      const words = [];

      allWords.forEach(function(word) {
          if(req.params.category == word.category) {
            words.push(word);
          }
      });

      words.sort(function(a, b) {
        if (a.dutch < b.dutch) {
          return -1;
        }
        if (a.dutch > b.dutch) {
          return 1;
        }
        return 0;
      });

      res.render("vocabulary", {words: words, category: req.params.category});
  })
});

app.get("/:category/Repaso", function(req, res) {
  res.render("flashcards", {category: req.params.category});
});

app.get("/:category/Quiz", function(req, res) {
  res.render("quiz", {category: req.params.category});
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started sucessfully");
});
