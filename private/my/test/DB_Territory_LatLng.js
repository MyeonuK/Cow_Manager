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
const conn = mysql.createConnection({
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
});
*/

const conn = mysql.createConnection({
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

conn.connect(function (err) {
  if (err) writeLog("conn error: " + err);
  else console.log("connected successfulley!");
});

// 테이블 생성
/*
conn.query(
  "CREATE TABLE Territory (code INT(3) AUTO_INCREMENT, region VARCHAR(10) NOT NULL, address INT(4) NOT NULL, status INT(1) NOT NULL, PRIMARY KEY(code))",
  (err, results, fields) => {
    if (err) writeLog(err);
    else console.log("create table territory success");
  }
);

conn.query(
  "CREATE TABLE LatLng (code INT(3) NOT NULL, number INT(2), lat VARCHAR(20), lng VARCHAR(20), PRIMARY KEY(code, number), FOREIGN KEY(code) REFERENCES Territory(code))",
  (err, results, fields) => {
    if (err) writeLog(err);
    else console.log("create table latlng success");
  }
);*/

// 테이블 비우기
/*
conn.query("DELETE FROM LatLng", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("delete table latlng success");
});
conn.query("DELETE FROM Territory", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("delete table territory success");
});
*/
/*
conn.query("DROP TABLE LatLng", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("drop table latlng success");
});

conn.query("DROP TABLE Territory", (err, results, fields) => {
  if (err) writeLog(err);
  else console.log("drop table territory success");
});
*/
///////

let nameArr = [
  "신학리 1173",
  "신학리 1165",
  "신학리 1234",
  "신학리 1228",
  "신학리 1229",
  "신학리 1163",
  "신학리 1222",
  "신학리 1223",
  "신학리 1274",
];

let arr = [
  [
    34.980768672422435, 126.4311310140685, 34.98051374425295, 126.4320536939383,
    34.9809928327433, 126.43227899948788, 34.981221387732774,
    126.43162990492833, 34.981047773904805, 126.43125707788795,
  ],
  [
    34.98025546785405, 126.42954276761496, 34.97988599041434, 126.4305198017815,
    34.97923324286332, 126.43018159764692, 34.979417983264156,
    126.4298960030444, 34.97951133398879, 126.42963630191488, 34.97946738023785,
    126.42916959756215,
  ],
  [
    34.979032217838224, 126.43018917267595, 34.97824516676088,
    126.42981649590729, 34.977922602658616, 126.43071406953327,
    34.97871825847928, 126.43111824011336,
  ],
  [
    34.979111032305255, 126.4290178056548, 34.978617263676696,
    126.42877043917714, 34.97833595619183, 126.42974676322541,
    34.979004059890606, 126.43007935713197, 34.97913592181866,
    126.42960728836137, 34.97915350339303, 126.42928542329052,
  ],
  [
    34.97852356453171, 126.42874204405403, 34.97789994028387,
    126.42846628245327, 34.97760168353005, 126.42932665864764,
    34.97824338610933, 126.42965757256856,
  ],
  [
    34.979729171844056, 126.42805125735002, 34.97913368019059,
    126.42776776220876, 34.97913368019059, 126.42800486723598,
    34.979365964684035, 126.42855639414717, 34.97945043160919,
    126.4288965883167,
  ],
  [
    34.97809893602964, 126.42723974849616, 34.977290169287166,
    126.42688569690527, 34.97701764825966, 126.42778691913662,
    34.97776488116942, 126.42817315723575,
  ],
  [
    34.97721879541215, 126.42682744849634, 34.97648034859346, 126.4264412103972,
    34.97607595822839, 126.42738534797287, 34.97697264721242,
    126.42772867072766,
  ],
  [
    34.97642507760039, 126.4264123871189, 34.976293211307414,
    126.42635874293848, 34.975721788251, 126.42712049030065, 34.97598552246475,
    126.42730288051413,
  ],
];

for (let i = 0; i < nameArr.length; i++) {
  conn.query(
    `INSERT INTO Territory(region, address, status) VALUES('${nameArr[i].slice(
      0,
      nameArr[i].indexOf(" ")
    )}', '${nameArr[i].slice(nameArr[i].indexOf(" ") + 1)}','0')`,
    (err, results, fields) => {
      if (err) writeLog(err);
      else
        console.log(
          `insert values into territory : ${i + 1}/${nameArr.length}`
        );
    }
  );

  for (let j = 0; j < arr[i].length; j += 2) {
    conn.query(
      `INSERT INTO LatLng(code, number, lat, lng) VALUES('${i + 1}', '${
        (j + 2) / 2
      }', '${arr[i][j]}', '${arr[i][j + 1]}')`,
      (err, results, fields) => {
        if (err) writeLog(err);
        else
          console.log(
            `insert values into Latlng : ${(j + 2) / 2}/${arr[i].length / 2}`
          );
      }
    );
  }
}
