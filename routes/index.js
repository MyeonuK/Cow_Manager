const express = require("express");
const mysql = require("mysql");
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
  update(req, res);
});

router.get("/pls", function (req, res) {
  let sql = `SELECT * FROM cowList WHERE id="${req.query.id}"`;

  if (req.query.id == null) {
    sql = `SELECT * FROM cowList`;
  }
  conn.query(sql, function (err, rows, fields) {
    if (err) console.error(err);
    else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
