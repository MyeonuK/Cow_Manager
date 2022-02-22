const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

//const databaseConnection = require("./databaseConnection");
const {
  Profile,
  Vaccin,
  House,
  Territory,
  LatLng,
  Sequelize,
} = require("../models");

let conn = null;

function writeLog(message) {
  let log = `=========${new Date()}=========\n${message}\n\n`;
  fs.appendFile("public/log/newDB.txt", log, function (err) {
    if (err) console.error(err);
    else console.log("===error===");
  });
  console.log("========= error appended =========");
}

/*
router.get("/", function (req, res) {
  let ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  conn = databaseConnection.getDatabaseConnection(ip);
  res.render("index.ejs");
});
*/

router.get("/", async (req, res, next) => {
  try {
    res.render("index.ejs");
  } catch (err) {
    console.error(err);
  }
});

router.get("/cow/count", async (req, res) => {
  const { type, house, ...etc } = req.query;

  try {
    switch (type) {
      case undefined:
      case "all":
        Profile.count().then((count) => {
          res.json(count);
        });
        break;

      case "house":
        House.count({
          where: { house: house },
        }).then((count) => {
          res.json(count);
        });
        break;

      case "room":
        House.count({
          where: { house: house },
          group: ["side", "room"],
        }).then((result) => {
          let resultArr = new Array(2);
          resultArr[0] = new Array(19);
          resultArr[1] = new Array(19);

          for (let item of result) {
            if (item.side == "L") {
              resultArr[0][item.room - 1] = item.count;
            } else {
              resultArr[1][item.room - 1] = item.count;
            }
          }
          res.json(resultArr);
        });
        break;
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/cow/age", async (req, res) => {
  const { type, house, ...etc } = req.query;

  try {
    switch (type) {
      case "house":
        Profile.findAll({
          include: [
            {
              model: House,
              where: { house: house },
              attributes: [],
            },
          ],
          attributes: [["age", "age"]],
          group: ["Profile.id"],
        }).then((result) => {
          let averageAge =
            result.reduce((sum, current) => sum + current.dataValues.age, 0) /
            result.length;

          averageAge = Math.round(averageAge * 10) / 10;
          res.status(200).json(averageAge);
        });
        break;

      case "room":
        let resultArr = new Array(2);
        resultArr[0] = new Array(19);
        resultArr[1] = new Array(19);

        async function test(resultArr) {
          for (let i = 0; i < 19; i++) {
            await Profile.findAll({
              include: [
                {
                  model: House,
                  where: { house: house, side: "L", room: i + 1 },
                  attributes: [],
                },
              ],
              attributes: [["age", "age"]],
              group: ["Profile.id"],
            }).then((result) => {
              let averageAge =
                result.reduce(
                  (sum, current) => sum + current.dataValues.age,
                  0
                ) / result.length;

              averageAge = Math.round(averageAge * 10) / 10;
              resultArr[0][i] = averageAge;
            });

            await Profile.findAll({
              include: [
                {
                  model: House,
                  where: { house: house, side: "R", room: i + 1 },
                  attributes: [],
                },
              ],
              attributes: [["age", "age"]],
              group: ["Profile.id"],
            }).then((result) => {
              let averageAge =
                result.reduce(
                  (sum, current) => sum + current.dataValues.age,
                  0
                ) / result.length;

              averageAge = Math.round(averageAge * 10) / 10;
              resultArr[1][i] = averageAge;
            });
          }

          return resultArr;
        }
        test(resultArr).then((ress) => {
          res.status(200).json(ress);
        });

        break;
      /*
        House.findAll({
          include: [
            {
              model: Profile,
              attributes: [["age", "age"]],
            },
          ],
          attributes: [
            ["side", "side"],
            ["room", "room"],
          ],
          where: { house: house },
          group: ["side"],
        }).then((result) => {
          res.json(result);
        });
        break;
        */
      /*
        Profile.findAll({
          include: [
            {
              model: House,
              where: { house: house },
            },
          ],
          attributes: [["age", "age"]],
          group: ["side", "room"],
        }).then((result) => {
          res.json(result);
        });
        break;
        */

      case "all":
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/cow/list", async (req, res) => {
  const { type, house, side, room, ...etc } = req.query;
  let seqSetting = {
    include: [
      {
        model: House,
      },
    ],
    attributes: [
      ["id", "id"],
      ["birthDate", "birthDate"],
      ["age", "age"],
      ["sex", "sex"],
    ],
    order: ["id", "age", "sex"],
    group: ["Profile.id"],
  };

  if (type == "house") {
    seqSetting.include[0].where = { house: house };
  } else if (type == "room") {
    seqSetting.include[0].where = { house: house, side: side, room: room };
  }

  try {
    Profile.findAll(seqSetting).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/house/title", async (req, res) => {
  try {
    House.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("house")), "house"]],
      order: [["house", "ASC"]],
    }).then((result) => {
      res.json(result.map((r) => r.house));
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/house/list", function (req, res) {
  let sql;
  if (req.query.request == "all") {
    sql = "SELECT COUNT(*) AS cnt FROM House";
  } else if (req.query.request == "title") {
    sql = "SELECT DISTINCT house FROM House ORDER BY house";
  }

  conn.query(sql, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      //result.push(rows[0]["COUNT(*)"]);
      console.log(rows[0].house);
      let result = [];
      for (let d of rows) {
        result.push(d.house);
      }
      res.status(200).json(rows);
    }
  });
});

router.get("/house/room", function (req, res) {
  const { house, ...etc } = req.query;

  try {
    House.findAll({
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("room")), "room"]],
      order: [["room", "ASC"]],
      where: { house: house },
    }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/territory/status", async (req, res) => {
  const { type, ...etc } = req.query;

  try {
    switch (type) {
      case undefined:
      case "all":
        Territory.count({
          group: ["status"],
        }).then((result) => {
          console.log(result.map((r) => r.count));
          res.json(result.map((r) => r.count));
        });
        break;
    }
  } catch (err) {
    console.error(err);
  }
});

/////////////////////////

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
