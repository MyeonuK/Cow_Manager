const mysql = require("mysql");
const express = require("express");
//const db = require("./database");
//const crawler = require("./crawler");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
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

router.get("/outline", function (req, res) {
  conn.query("SELECT COUNT(*) FROM cowList", function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json(rows[0]["COUNT(*)"]);
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

router.get("/update", function (req, res) {
  conn.query(`SELECT id FROM cowList`, (err, rows, fields) => {
    if (err) console.error(err);
    else {
      let numbers = [];

      for (let i = 0; i < rows.length; i++) {
        numbers.push(rows[i].id);
      }
      console.log(rows.length);
      for (let i of numbers) {
        readData(i).then((res) => {
          let sql_update = `UPDATE cowList SET birthDate='${res.birthDate}', age='${res.age}', sex='${res.sex}', famInfo='${res.famInfo}', famDate='${res.famDate}', bruInfo='${res.bruInfo}', tubeInfo='${res.tubeInfo}'`;

          if (res.bruDate != null) {
            sql_update += `, bruDate='${res.bruDate}'`;
          }
          if (res.tubeDate != null) {
            sql_update += `, tubeDate='${res.tubeDate}'`;
          }
          sql_update += `WHERE id='${res.id}'`;

          conn.query(sql_update, (err, rows, fields) => {
            if (rows) console.error(err);
            //else console.log(rows);
          });
        });
      }
    }
  });

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
      //console.log(stringList);
      return stringList;
    })
    .then((res) => {
      let myData = {};
      // res로부터 파싱
      let id = res[0].title;
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
      myData.famDate =
        "20" + fam.slice(0, 2) + "-" + fam.slice(3, 5) + "-" + fam.slice(6, 8);
      myData.famInfo = fam.slice(fam.indexOf("(") + 1, fam.indexOf(")"));

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

      //console.log(myData);
      return myData;
    });

  //return this;
}

async function getHTML(animalNo) {
  try {
    return await axios.get(
      `https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=${animalNo}`
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = router;
