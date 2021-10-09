// mysql 모듈 사용
const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const { Template } = require("ejs");
const { response } = require("express");
const csv = fs.readFileSync("private/data/dataInput.csv");
const records = parse(csv.toString());

// 연결할 DB 정보입력
/*
const connection = mysql.createConnection({
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
});
*/

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cowmanager",
  port: "3306",
});

function writeLog(message) {
  log = `=========${new Date()}=========\n${message}\n\n`;
  fs.appendFile("public/log/newDB.txt", log, function (err) {
    if (err) console.error(err);
    else console.log("===error===");
  });
}

connection.connect(function (err) {
  if (err) writeLog("connection error: " + err);
  else console.log("connected successfulley!");
});
/*
// 테이블 삭제
connection.query("DROP TABLE House", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("drop table house success");
});
connection.query("DROP TABLE Profile", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("drop table profile success");
});
connection.query("DROP TABLE Vaccin", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("drop table vaccin success");
});

// 테이블 생성
connection.query(
  "CREATE TABLE House (id VARCHAR(15) NOT NULL, house VARCHAR(1) NOT NULL, side VARCHAR(1), room INT(2), PRIMARY KEY(id))",
  (err, results, fields) => {
    if (err) writeLog(err);
    else console.log("create table house success");
  }
);

connection.query(
  "CREATE TABLE Profile (id VARCHAR(15) NOT NULL, birthDate DATE, age INT(3), sex VARCHAR(3), PRIMARY KEY(id))",
  (err, results, fields) => {
    if (err) writeLog(err);
    else console.log("create table profile success");
  }
);

connection.query(
  "CREATE TABLE Vaccin (id VARCHAR(15) NOT NULL, famInfo VARCHAR(5), famDate DATE, bruInfo VARCHAR(5), bruDate DATE, tubeInfo VARCHAR(5), tubeDate DATE, PRIMARY KEY(id))",
  (err, results, fields) => {
    if (err) writeLog(err);
    else console.log("create table vaccin success");
  }
);
*/

// db에 소 번호, 축사 정보 입력
/*
let ids = [];

for (let i = 0; i < records.length; i++) {
  let info = {};

  for (let l = 0; l < 5 - records[i][1].length; l++) {
    records[i][1] = "0" + records[i][1];
  }
  info.id = "00" + records[i][0] + records[i][1];
  ids.push(info.id);

  if (records[i][2] == "out") {
    info.house = "O";
    info.side = `null`;
    info.room = `null`;
  } else {
    info.house = records[i][2][0];
    info.side = `'${records[i][2][1]}'`;
    info.room = `'${records[i][2].slice(2)}'`;
  }

  connection.query(
    `INSERT INTO House(id, house, side, room) VALUES('${info.id}', '${info.house}', ${info.side}, ${info.room})`,
    (err, results, fields) => {
      if (err) writeLog(err);
      else console.log(`insert values into house : ${i + 1}/${records.length}`);
    }
  );
}

for (let i = 0; i < ids.length; i++) {
  connection.query(
    `INSERT INTO Profile(id) VALUES('${ids[i]}')`,
    (err, results, fields) => {
      if (err) writeLog(err);
      else console.log(`insert values into profile : ${i + 1}/${ids.length}`);
    }
  );
}

for (let i = 0; i < ids.length; i++) {
  connection.query(
    `INSERT INTO Vaccin(id) VALUES('${ids[i]}')`,
    (err, results, fields) => {
      if (err) writeLog(err);
      else console.log(`insert values into vaccin : ${i + 1}/${ids.length}`);
    }
  );
}
*/

// 파싱 후 데이터베이스 입력

connection.query(`SELECT id FROM cowList`, (err, rows, fields) => {
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

          connection.query(sql_profile_update, (err, rows, fields) => {
            if (err) writeLog(err);
            //else console.log(rows);
          });

          connection.query(sql_vaccin_update, (err, rows, fields) => {
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
        myData.famDate = `'20${fam.slice(0, 2)}-${fam.slice(3, 5)}-${fam.slice(
          6,
          8
        )}'`;
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
        if (tubeInfo[i] != " " && tubeInfo[i] != "\t" && tubeInfo[i] != "\n") {
          myData.tubeInfo = `'${tubeInfo.slice(
            i,
            tubeInfo.indexOf("\n", i - 1) - 1
          )}'`;
          break;
        }
      }

      for (let i = 0; i < tubeDate.length; i++) {
        if (tubeDate[i] != " " && tubeDate[i] != "\t" && tubeDate[i] != "\n") {
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

      if (myData == null) {
        console.log("wwwwwwwwww");
      }

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
