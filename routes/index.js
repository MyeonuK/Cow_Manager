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
  /*
  console.log(JSON.stringify(dbConfig.search(conn, "TTABLE", req.query.id)));
  res
    .status(200)
    .json(JSON.stringify(dbConfig.search(conn, "TTABLE", req.query.id)));
    */

  let sql = `SELECT * FROM TTABLE WHERE testkey="${req.query.id}"`;

  if (id == null) {
    sql = `SELECT * FROM TTABLE`;
  }
  conn.query(sql, function (err, rows, fields) {
    if (err) console.error(err);
    else {
      console.log(JSON.stringify(rows[0]));
      res.status(200).json(JSON.stringify(rows[0]));
    }
  });
});

module.exports = router;
