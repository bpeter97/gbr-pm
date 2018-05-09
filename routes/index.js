const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", (req, res) => {
  // ending commit data
  commitData = getCommits(commits => {
    res.send(commits);
  });

  // fetch("https://api.github.com/repos/bpeter97/gbr-mern/commits")
  //   .then(results => results.json())
  //   .then(json => {
  //     var commits = [];

  //     json.map(c => {
  //       commit = {
  //         author: c.author.login,
  //         date: c.commit.author.date,
  //         message: c.commit.message,
  //         url: c.commit.tree.url
  //       };
  //       commits.push(commit);
  //     });

  //     res.send(commits);
  //     // res.render("index.hbs", {
  //     //   gitHubCommits: commits
  //     // });
  //   })
  //   .catch(e => console.log(e));
});

function getCommits(callback) {
  // api.github.com/repos/bpeter97/gbr-mern/

  fetch(
    "https://api.github.com/repos/bpeter97/gbr-mern/branches?client_id=e325d85b671a4e1011a6&client_secret=504b3708d5f8f3df0ade551378b49bc5554707d2"
  )
    .then(results => results.json())
    .then(branches => {
      commitData = {};
      branches.forEach(branch => {
        commitData[branch.name] = {
          sha: branch.commit.sha,
          commits: []
        };
      });

      for (var branch in commitData) {
        fetch(
          `https://api.github.com/repos/bpeter97/gbr-mern/commits?per_page=100&sha=${
            commitData[branch].sha
          }&client_id=e325d85b671a4e1011a6&client_secret=504b3708d5f8f3df0ade551378b49bc5554707d2`
        )
          .then(results => results.json())
          .then(branchCommits => {
            branchCommits.forEach(c => {
              commit = {
                author: c.author.login,
                date: c.commit.author.date,
                message: c.commit.message,
                url: c.commit.tree.url
              };
              commitData[branch].commits.push(commit);
            });
          });
      }
      return commitData;
    });
  callback(commitData);
}

module.exports = router;
