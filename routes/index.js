const express = require("express");
//const db = require("./database");
//const crawler = require("./crawler");
const router = express.Router();
const mysql = require("mysql");

/*
let dbInfo = {
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
};
*/
let dbInfo = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "cowmanager",
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

router.get("/newpage", function (req, res) {
  res.render("newpage.ejs");
});

router.get("/update", function (req, res) {
  // db.update(req, res, conn);
});
/*
router.get("/load", function (req, res) {
  let io = db.load(req.query.id);
  console.log(io);
  //res.send(JSON.stringify(db.load(req.query.id)));
  //res.status(200).json(db.load(req.query.id));
});
*/

router.get("/load", function (req, res) {
  let sql = `SELECT * FROM cowList WHERE id="${req.query.id}"`;

  if (req.query.id == undefined) {
    sql = `SELECT * FROM cowList`;
  }
  console.log(sql);

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

module.exports = router;
