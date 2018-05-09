const express = require("express");
const fetch = require("node-fetch");
const hbs = require("hbs");
const moment = require("moment");

const index = require("./routes/index");

const port = process.env.PORT || 3000;

const app = express();

// Set the view engine to handlebars.
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("commits", items => {
  var display = "";

  for (var i = 0, l = items.length; i < l; i++) {
    var display = display + '<div class="github-commit-day" id="m16">';
    var display = display + '<div class="github-inner">';
    var display = display + '<div class=" d-flex justify-content-center">';
    var display = display + '<div class="list-group list-group-flush w-100">';
    var display = display + '<div class="list-group-item">';
    var display = display + '<div class="d-flex justify-content-between">';
    var display = display + '<div class="d-sm-block col-md-6 col-sm-12">';
    var display = display + '<p class="mb-1">';
    var display =
      display + '<a href="' + items[i].url + '" style="color:darkgreen;">';
    var display = display + items[i].message;
    var display = display + "</a>";
    var display = display + "</p></div>";
    var display = display + '<div class="d-none d-md-block col-md-6 ">';
    var display = display + "<small class='d-none d-md-block'>";
    var display =
      display +
      items[i].author +
      " committed on " +
      moment(items[i].date).format("MMMM Do, YYYY");
    var display = display + "</small>";
    var display = display + "</div></div></div></div></div></div></div>";
  }
  return display;
});

// Use Routes
app.use("/", index);
// app.get("/", (req, res) => {
//   // api.github.com/repos/bpeter97/gbr-mern/
//   fetch("https://api.github.com/repos/bpeter97/gbr-mern/commits")
//     .then(results => results.json())
//     .then(json => {
//       var commits = [];

//       json.map(c => {
//         commit = {
//           author: c.author.login,
//           date: c.commit.author.date,
//           message: c.commit.message,
//           url: c.commit.tree.url
//         };
//         commits.push(commit);
//       });

//       // res.send(commits);
//       res.render("index.hbs", {
//         gitHubCommits: commits
//       });
//     })
//     .catch(e => console.log(e));
// });

app.listen(port, () => console.log(`Server running on port ${port}`));
