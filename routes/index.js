const mysql = require("mysql");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

function writeLog(message) {
  let log = `=========${new Date()}=========\n${message}\n\n`;
  fs.appendFile("public/log/newDB.txt", log, function (err) {
    if (err) console.error(err);
    else console.log("===error===");
  });
  console.log("========= error appended =========");
}

router.get("/", async (req, res, next) => {
  try {
    res.render("index.ejs");
  } catch (err) {
    console.error(err);
  }
});

/*
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
*/

module.exports = router;
