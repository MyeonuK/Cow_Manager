const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let conn = null;

function writeLog(message) {
  ``;
  log = `=========${new Date()}=========\n${message}\n\n`;
  fs.appendFile("public/log/newDB.txt", log, function (err) {
    if (err) console.error(err);
    else console.log("===error===");
  });
  console.log("========= error appended =========");
}

router.get("/", function (req, res) {
  let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;
  if (ip == "::1" || ip == "::ffff:127.0.0.1") {
    conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "cowmanager",
      port: "3306",
    });
  } else {
    conn = mysql.createConnection({
      host: "myeonu.cafe24app.com",
      user: "gusdn0217",
      password: "Dbdb4783!",
      database: "gusdn0217",
      port: "3306",
    });
  }
  conn.connect(function (err) {
    if (err) writeLog("connection error: " + err);
    else console.log("connected successfuelly!");
  });

  res.render("index.ejs");
});

router.get("/newpage", function (req, res) {
  res.render("newpage.ejs");
});

router.get("/cow_count", function (req, res) {
  let api;
  if (req.query.request == "total") {
    api = "SELECT COUNT(*) FROM House";
  }

  conn.query(api, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      //result.push(rows[0]["COUNT(*)"]);
      res.status(200).json(rows[0]["COUNT(*)"]);
    }
  });
});

router.get("/outline", function (req, res) {
  let result = [];
  conn.query("SELECT COUNT(*) FROM House", function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      result.push(rows[0]["COUNT(*)"]);
      res.status(200).json(result);
    }
  });
});

router.get("/house", function (req, res) {
  conn.query(
    "SELECT house, COUNT(*) AS cnt, ROUND(AVG(age), 1) AS age FROM Profile AS p JOIN House As h ON p.id = h.id GROUP BY house",
    function (err, rows, fields) {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/house_room", function (req, res) {
  let sql = `SELECT side, room, COUNT(*) AS cnt, ROUND(AVG(age), 1) AS age FROM House As h JOIN Profile As p ON h.id = p.id WHERE house='${req.query.house}' GROUP BY side, room`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
  /*
  let sql = `SELECT DISTINCT house, side, room FROM House WHERE house=${req.query.house}`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      let sql = "SELECT";
      for (let r of rows) {
        sql += `, COUNT(CASE WHEN house='${r.house}' AND side='${r.side}' AND room='${r.room}' THEN 1 END) AS '${r.house}${r.side}${r.room}'`;
      }
      sql = sql.slice(0, 6) + sql.slice(7) + ` FROM House`;

      conn.query(sql, function (err, rows, fields) {
        if (err) {
          console.error(err);
        } else {
          res.status(200).json(rows);
        }
      });
    }
  });
  */
});

router.get("/room_cow", function (req, res) {
  let sql = `SELECT id FROM House WHERE house=${req.query.house} AND side=${req.query.side} AND room=${req.query.room}`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/cow_house", function (req, res) {
  let sql = `SELECT * FROM House`;

  if (req.query.id != undefined) {
    sql = `SELECT * FROM House WHERE id=${req.query.id}`;
  } else if (req.query.house == `'O'`) {
    sql = `SELECT * FROM House WHERE house=${req.query.house}`;
  } else if (req.query.house != undefined) {
    sql = `SELECT * FROM House WHERE house=${req.query.house} AND side=${req.query.side} AND room=${req.query.room}`;
  }

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/cow_profile", function (req, res) {
  let sql = `SELECT * FROM Profile WHERE id="${req.query.id}"`;

  if (req.query.id == undefined) {
    sql = `SELECT * FROM Profile`;
  }
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/cow_vaccin", function (req, res) {
  let sql = `SELECT * FROM Vaccin WHERE id="${req.query.id}"`;

  if (req.query.id == undefined) {
    sql = `SELECT * FROM Vaccin`;
  }
  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/rooms", function (req, res) {
  let sql = `SELECT DISTINCT house, room FROM cowList WHERE house LIKE '${req.query.house}%'`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      let rooms = rows;

      let sql = "SELECT";
      for (let room of rooms) {
        sql += `, COUNT(CASE WHEN house='${room.house}' AND room='${room.room}' THEN 1 END) AS '${room.house}${room.room}'`;
      }
      sql = sql.slice(0, 6) + sql.slice(7) + ` FROM cowList`;

      conn.query(sql, function (err, rows, fields) {
        if (err) {
          console.error(err);
        } else {
          res.status(200).json(rows);
        }
      });
    }
  });
});

router.get("/territory_status", function (req, res) {
  let sql = `SELECT status, COUNT(*) AS cnt FROM Territory GROUP BY status`;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/territory_status_update", function (req, res) {
  let sql = `UPDATE Territory SET status='${req.query.status}' WHERE code='${req.query.code}'`;
  console.log(sql);

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      this.writeLog(err);
    } else {
      console.log("okokopk");
      res.status(200).json(rows);
    }
  });
});

router.get("/territory_latlng", function (req, res) {
  let sql = `SELECT ll.code, t.status, ll.number, ll.lat, ll.lng FROM LatLng AS ll LEFT JOIN Territory AS t ON ll.code=t.code
  `;

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      writeLog(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

router.get("/update", function (req, res) {
  conn.query(`SELECT id FROM cowList`, (err, rows, fields) => {
    if (err) writeLog(err);
    else {
      let numbers = [];

      for (let i = 0; i < rows.length; i++) {
        numbers.push(rows[i].id);
      }
      console.log(numbers.length);

      let a = 0;
      let b = numbers.length;
      let count = 0;

      for (let j = a; j < b; j++) {
        let id = numbers[j];
        readData(id).then((res) => {
          if (res == null) {
            writeLog(
              "connection.query(`SELECT id FROM cowList`...\n-> res == null\nid = " +
                id
            );
          } else {
            let sql_profile_update = `UPDATE Profile SET birthDate=${res.birthDate}, age=${res.age}, sex=${res.sex} WHERE id=${res.id}`;
            let sql_vaccin_update = `UPDATE Vaccin SET famInfo=${res.famInfo}, famDate=${res.famDate}, bruInfo=${res.bruInfo}, bruDate=${res.bruDate}, tubeInfo=${res.tubeInfo}, tubeDate=${res.tubeDate} WHERE id=${res.id}`;

            conn.query(sql_profile_update, (err, rows, fields) => {
              if (err) writeLog(err);
              //else console.log(rows);
            });

            conn.query(sql_vaccin_update, (err, rows, fields) => {
              if (err) {
                writeLog(err);
                console.log(sql_vaccin_update);
              }
              //else console.log(rows);
            });
            console.log(`${++count}/${b - a}`);
          }
        });
      }
    }
  });

  async function readData(animalNo) {
    return await getHTML(animalNo)
      .then((html) => {
        // 크롤링
        if (html == undefined) {
          writeLog("readData() -> html == undefined");
          return null;
        } else {
          let stringList = [];

          const $ = cheerio.load(html.data);

          const bodyList = $("div.infTb")
            .children("table")
            .children("tbody")
            .children("tr")
            .children("td");

          bodyList.each(function (i, elem) {
            stringList[i] = {
              title: $(this).text(),
            };
          });
          return stringList;
        }
      })
      .then((res) => {
        let myData = {};
        let id;

        try {
          id =
            res[0].title.slice(0, 3) +
            res[0].title.slice(4, 8) +
            res[0].title.slice(9, 13) +
            res[0].title.slice(14, 15);
        } catch (error) {
          return null;
        }
        let birthDate = res[1].title;

        let sex = res[3].title;
        let fam = res[10].title;
        let bruDate = res[11].title;
        let bruInfo = res[12].title;
        let tubeDate = res[13].title;
        let tubeInfo = res[14].title;

        if (res.length > 15) {
          sex = res[4].title;
          fam = res[11].title;
          bruDate = res[12].title;
          bruInfo = res[13].title;
          tubeDate = res[14].title;
          tubeInfo = res[15].title;
        }

        // 개체번호, 생년월일, 성별
        myData.id = `'${id}'`;
        myData.sex = `'${sex.slice(0, 2)}'`;

        // 생년월일, 나이
        myData.birthDate = `'${birthDate.slice(0, birthDate.indexOf(" "))}'`;
        myData.age = `'${birthDate.slice(
          birthDate.indexOf("(") + 1,
          birthDate.indexOf(")") - 3
        )}'`;

        // 구제역
        for (let i = 0; i < fam.length; i++) {
          if (fam[i] != " " && fam[i] != "\t" && fam[i] != "\n") {
            fam = fam.slice(i, fam.indexOf("\n", i - 1));
            break;
          }
        }
        myData.famInfo = `'${fam.slice(0, 3)}'`;
        if (myData.famInfo == `'미접종'`) {
          myData.famDate = `null`;
        } else {
          myData.famInfo = `'${fam.slice(
            fam.indexOf("(") + 1,
            fam.indexOf(")")
          )}'`;
          myData.famDate = `'20${fam.slice(0, 2)}-${fam.slice(
            3,
            5
          )}-${fam.slice(6, 8)}'`;
        }

        // 브루셀라
        myData.bruInfo = `'${bruInfo}'`;
        if (myData.bruInfo == `'해당 없음'`) {
          myData.bruDate = `null`;
        } else {
          let temp = "";
          for (let i = 0; i < bruDate.length; i++) {
            if (bruDate[i] != " " && bruDate[i] != "\t" && bruDate[i] != "\n") {
              index = bruDate.indexOf("\n", i - 1);
              temp = bruDate.slice(i, bruDate.indexOf("\n", i - 1));
              break;
            }
          }
          myData.bruDate = `'${temp}'`;
        }

        // 결핵
        for (let i = 0; i < tubeInfo.length; i++) {
          if (
            tubeInfo[i] != " " &&
            tubeInfo[i] != "\t" &&
            tubeInfo[i] != "\n"
          ) {
            myData.tubeInfo = `'${tubeInfo.slice(
              i,
              tubeInfo.indexOf("\n", i - 1) - 1
            )}'`;
            break;
          }
        }

        for (let i = 0; i < tubeDate.length; i++) {
          if (
            tubeDate[i] != " " &&
            tubeDate[i] != "\t" &&
            tubeDate[i] != "\n"
          ) {
            myData.tubeDate = `'${tubeDate.slice(
              i,
              tubeDate.indexOf("\n", i - 1)
            )}'`;
            break;
          }
        }
        if (myData.tubeInfo == `'미검사'`) {
          myData.tubeDate = `null`;
        }

        // 업데이트 날짜
        let today = new Date();
        myData.update = `'${today.toLocaleString()}'`;

        return myData;
      });
  }

  async function getHTML(animalNo) {
    try {
      let url = encodeURI(
        `https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=${animalNo}`
      );
      return await axios.get(url);
    } catch (error) {
      console.error(error);
    }
  }
});

module.exports = router;
