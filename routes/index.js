const express = require("express");
const router = express.Router();

let dbConfig = require("./database");
let conn = dbConfig.init();
dbConfig.connect(conn);

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.get("/update", function (req, res) {
  res.status(200).json({
    message: "tetssssst",
    howww: "hwoowo",
  });
});

router.get("/pls", function (req, res) {
  console.log(JSON.stringify(dbConfig.search(conn, "TTABLE", req.query.id)));
  res
    .status(200)
    .json(JSON.stringify(dbConfig.search(conn, "TTABLE", req.query.id)));
});

module.exports = router;
