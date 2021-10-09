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
  fs.appendFile("public/log/newDB.txt", message, function (err) {
    if (err) console.error(err);
    else console.log("===error===");
  });
}

connection.connect(function (err) {
  if (err) writeLog("connection error: " + err);
  else console.log("connected successfulley!");
});

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

// db 생성
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
/*
conn.query(`SELECT id FROM cowList`, (err, rows, fields) => {
  if (err) writeLog(err);
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
            if (err) writeLog(err);
            //else console.log(rows);
          });
        }
      });
    }
  }
});
async function getHTML(animalNo) {
  try {
    return await axios.get(
      `https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=${animalNo}`
    );
  } catch (error) {
    writeLog(error);
  }
}
*/
