const express = require("express");
const hbs = require("hbs");
const moment = require("moment");

const index = require("./routes/index");

const port = process.env.PORT || 3000;

const app = express();

// Set the view engine to handlebars.
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

hbs.registerHelper("commits", items => {
  var display = '<ul class="nav nav-tabs pt-2 px-4" id="myTab" role="tablist">';

  for (branch in items) {
    if (items[branch].name == "master") {
      active = " active";
    } else {
      active = "";
    }
    display = display + '<li class="nav-item">';
    display =
      display +
      `<a class="nav-link${active}" id="${
        items[branch].name
      }-tab" data-toggle="tab" href="#${
        items[branch].name
      }" role="tab" aria-controls="${
        items[branch].name
      }" aria-selected="true">${items[branch].name}</a>`;
    display = display + "</li>";
  }

  display = display + "</ul>";
  display = display + '<div class="tab-content pb-2 px-4" id="myTabContent">';
  for (branch in items) {
    if (items[branch].name == "master") {
      active = " show active";
    } else {
      active = "";
    }

    display =
      display +
      `<div class="tab-pane fade${active}" id="${
        items[branch].name
      }" role="tabpanel" aria-labelledby="${
        items[branch].name
      }-tab" style="overflow: hidden;">
    <div class="timeline mt-3 w-90" style="overflow-y: scroll; height:350px; overflow-x: hidden;">
      <div id="wallmessages">`;
    for (var i = 0, l = items[branch].commits.length; i < l; i++) {
      var display = display + '<div class="github-commit-day" id="m16">';
      display = display + '<div class="github-inner">';
      display = display + '<div class=" d-flex justify-content-center">';
      display = display + '<div class="list-group list-group-flush w-100">';
      display = display + '<div class="list-group-item">';
      display = display + '<div class="d-flex justify-content-between">';
      display = display + '<div class="d-sm-block col-md-6 col-sm-12">';
      display = display + '<p class="mb-1">';
      display =
        display +
        '<a href="' +
        items[branch].commits[i].url +
        '" style="color:darkgreen;">';
      display = display + items[branch].commits[i].message;
      display = display + "</a>";
      display = display + "</p></div>";
      display = display + '<div class="d-none d-md-block col-md-6 ">';
      display = display + "<small class='d-none d-md-block'>";
      if (items[branch].commits[i].author == "bpeter97") {
        var author = "Brian Peter Jr";
      } else if (items[branch].commits[i].author == "twh0008") {
        var author = "Taylor Hartley";
      }
      display =
        display +
        author +
        " committed on " +
        moment(items[branch].commits[i].date).format("MMMM Do, YYYY");
      display = display + "</small>";
      display = display + "</div></div></div></div></div></div></div>";
    }

    display =
      display +
      `</div>
    </div>
  </div>`;
  }
  display = display + "</div>";
  return display;
});

// Use Routes
app.use("/", index);

app.listen(port, () => console.log(`Server running on port ${port}`));
