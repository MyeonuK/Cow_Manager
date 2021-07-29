const express = require("express");
const mysql = require("mysql");
const db = require("./database");
const router = express.Router();

let dbInfo = {
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
};

const conn = mysql.createConnection(dbInfo);
conn.connect(function (err) {
  if (err) console.error("connection error: " + err);
  else console.log("connected successfuelly!");
});

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.get("/update", function (req, res) {
  // db.update(req, res, conn);
});

router.get("/load", function (req, res) {
  //let hek = { threee: "wefwf", two: "twowowo" };
  res.status(200).json(db.load(req, res, conn));
  //db.load(req, res, conn);
});

module.exports = router;
