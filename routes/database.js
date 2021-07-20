const mysql = require("mysql");
/*
let dbInfo = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "mytest",
};
*/

let dbInfo = {
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
};

module.exports = {
  init: function () {
    return mysql.createConnection(dbInfo);
  },
  connect: function (conn) {
    conn.connect(function (err) {
      if (err) console.error("connection error: " + err);
      else console.log("connected successfully!");
    });
  },
  search: function (conn, table, id) {
    let sql = `SELECT * FROM TTABLE WHERE testkey="${id}"`;

    if (id == null) {
      sql = `SELECT * FROM TTABLE`;
    }
    conn.query(sql, function (err, rows, fields) {
      if (err) console.error(err);
      else {
        return rows;
      }
    });
  },
};
