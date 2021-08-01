const express = require("express");
const db = require("./database");
//const crawler = require("./crawler");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.get("/update", function (req, res) {
  // db.update(req, res, conn);
});

router.get("/load", function (req, res) {
  res.status(200).json(JSON.stringify(db.load(req.query.id)));
});

module.exports = router;
