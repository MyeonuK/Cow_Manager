const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

let dbInfo = {
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
};
/*
let dbInfo = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "cowmanager",
  port: "3306",
};
*/
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

router.get("/outline", function (req, res) {
  let result = [];
  conn.query("SELECT COUNT(*) FROM cowList", function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      result.push(rows[0]["COUNT(*)"]);
      console.log(result);
      res.status(200).json(result);
    }
  });
});

router.get("/house", function (req, res) {
  conn.query(
    "SELECT house, room FROM cowList GROUP BY house, room",
    function (err, rows, fields) {
      if (err) {
        console.error(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

router.get("/load", function (req, res) {
  let sql = `SELECT * FROM cowList WHERE id="${req.query.id}"`;

  if (req.query.id == undefined) {
    sql = `SELECT * FROM cowList`;
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

router.get("/update", function (req, res) {
  // cafe24 server
  conn.query(`SELECT id FROM cowList`, (err, rows, fields) => {
    if (err) console.error(err);
    else {
      let numbers = [];

      for (let i = 0; i < rows.length; i++) {
        numbers.push(rows[i].id);
      }
      console.log(numbers.length);

      let num = Math.ceil(numbers.length / 20);

      for (let i = 0; i < num; i++) {
        let numm = 20;
        if (i == num - 1) {
          numm = numbers.length % 20;
        }

        setTimeout(() => {
          for (let j = 0; j < numm; j++) {
            let id = numbers[i * 20 + j];
            readData(id).then((res) => {
              if (res == null) {
                console.log(id);
              } else {
                let sql_update = `UPDATE cowList SET birthDate='${res.birthDate}', age='${res.age}', sex='${res.sex}', famInfo='${res.famInfo}', bruInfo='${res.bruInfo}', tubeInfo='${res.tubeInfo}'`;

                if (res.famDate != null) {
                  sql_update += `, famDate='${res.famDate}'`;
                }
                if (res.bruDate != null) {
                  sql_update += `, bruDate='${res.bruDate}'`;
                }
                if (res.tubeDate != null) {
                  sql_update += `, tubeDate='${res.tubeDate}'`;
                }
                sql_update += `WHERE id='${res.id}'`;

                conn.query(sql_update, (err, rows, fields) => {
                  if (err) console.error(err);
                });
              }
            });
          }
        }, 500 * i);
      }
    }
  });

  // local server
  /*
  conn.query(`SELECT id FROM cowList`, (err, rows, fields) => {
    if (err) console.error(err);
    else {
      let numbers = [];

      for (let i = 0; i < rows.length; i++) {
        numbers.push(rows[i].id);
      }
      console.log(numbers.length);

      for (let j = req.min; j < req.max; j++) {
        let id = numbers[j];
        readData(id).then((res) => {
          if (res == null) {
            console.log(id);
          } else {
            let sql_update = `UPDATE cowList SET birthDate='${res.birthDate}', age='${res.age}', sex='${res.sex}', famInfo='${res.famInfo}', bruInfo='${res.bruInfo}', tubeInfo='${res.tubeInfo}'`;

            if (res.famDate != null) {
              sql_update += `, famDate='${res.famDate}'`;
            }
            if (res.bruDate != null) {
              sql_update += `, bruDate='${res.bruDate}'`;
            }
            if (res.tubeDate != null) {
              sql_update += `, tubeDate='${res.tubeDate}'`;
            }
            sql_update += `WHERE id='${res.id}'`;

            conn.query(sql_update, (err, rows, fields) => {
              if (err) console.error(err);
              //else console.log(rows);
            });
          }
        });
      }
    }
  });
  */

  conn.query(`SELECT * FROM cowList`, function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows);
    }
  });
});

async function readData(animalNo) {
  return await getHTML(animalNo)
    .then((html) => {
      // 크롤링
      if (html == undefined) {
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
      myData.id = id;
      myData.sex = sex;
      if (myData.sex.length > 2) {
        myData.sex = myData.sex.slice(0, 2);
      }
      // 생년월일, 나이
      myData.birthDate = birthDate.slice(0, birthDate.indexOf(" "));
      myData.age = birthDate.slice(
        birthDate.indexOf("(") + 1,
        birthDate.indexOf(")") - 3
      );

      // 구제역
      for (let i = 0; i < fam.length; i++) {
        if (fam[i] != " " && fam[i] != "\t" && fam[i] != "\n") {
          fam = fam.slice(i, fam.indexOf("\n", i - 1));
          break;
        }
      }
      myData.famInfo = fam.slice(0, 3);
      if (myData.famInfo == "미접종") {
        myData.famDate = null;
      } else {
        myData.famInfo = fam.slice(fam.indexOf("(") + 1, fam.indexOf(")"));
        myData.famDate =
          "20" +
          fam.slice(0, 2) +
          "-" +
          fam.slice(3, 5) +
          "-" +
          fam.slice(6, 8);
      }

      // 브루셀라
      myData.bruInfo = bruInfo;
      if (bruInfo == "해당 없음") {
        myData.bruDate = null;
      } else {
        let temp = "";
        for (let i = 0; i < bruDate.length; i++) {
          if (bruDate[i] != " " && bruDate[i] != "\t" && bruDate[i] != "\n") {
            index = bruDate.indexOf("\n", i - 1);
            temp = bruDate.slice(i, bruDate.indexOf("\n", i - 1));
            break;
          }
        }
        myData.bruDate = temp;
      }

      // 결핵
      for (let i = 0; i < tubeInfo.length; i++) {
        if (tubeInfo[i] != " " && tubeInfo[i] != "\t" && tubeInfo[i] != "\n") {
          myData.tubeInfo = tubeInfo.slice(i, tubeInfo.indexOf("\n", i - 1));
          break;
        }
      }

      for (let i = 0; i < tubeDate.length; i++) {
        if (tubeDate[i] != " " && tubeDate[i] != "\t" && tubeDate[i] != "\n") {
          myData.tubeDate = tubeDate.slice(i, tubeDate.indexOf("\n", i - 1));
          break;
        }
      }
      if (myData.tubeDate == "해당없음") {
        myData.tubeDate = null;
      }

      // 업데이트 날짜
      let today = new Date();
      myData.update = today.toLocaleString();

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

module.exports = router;
