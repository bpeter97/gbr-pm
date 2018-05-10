const express = require("express");
const fetch = require("node-fetch");
const request = require("request");
const router = express.Router();

router.get("/", (req, res) => {
  options = {
    url:
      "https://api.github.com/repos/bpeter97/gbr-mern/branches?client_id=e325d85b671a4e1011a6&client_secret=504b3708d5f8f3df0ade551378b49bc5554707d2",
    headers: {
      "User-Agent": "gbrpm"
    }
  };

  function getCommits(error, response, body) {
    var bodyArray = JSON.parse(body);
    var commitData = {};
    var shas = [];

    bodyArray.forEach(branch => {
      shas.push({
        sha: branch.commit.sha,
        name: branch.name
      });

      commitData[branch.name] = {
        name: branch.name,
        commits: []
      };
    });

    shas.forEach(branch => {
      const options = {
        url: `https://api.github.com/repos/bpeter97/gbr-mern/commits?sha=${
          branch.sha
        }&client_id=e325d85b671a4e1011a6&client_secret=504b3708d5f8f3df0ade551378b49bc5554707d2`,
        headers: {
          "User-Agent": "gbrpm"
        }
      };

      request(options, (error, response, body) => {
        let commitsArray = JSON.parse(body);
        commitData[branch.name].commits = commitsArray.map(c => {
          return {
            author: c.author.login,
            date: c.commit.author.date,
            message: c.commit.message,
            url: c.commit.tree.url
          };
        });
      });
    });
    setTimeout(() => {
      res.render("index", { commitData });
    }, 5000);
  }

  request(options, getCommits);
});

module.exports = router;
