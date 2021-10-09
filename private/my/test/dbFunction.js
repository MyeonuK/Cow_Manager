// mysql 모듈 사용
const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");

const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const csv = fs.readFileSync("dataInput.csv");
const records = parse(csv.toString());

// 연결할 DB 정보입력

const connection = mysql.createConnection({
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
});

/*
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cowmanager",
  port: "3306",
});
*/
const sql_create =
  "CREATE TABLE cowList(id varchar(15) not null, birthDate date, sex varchar(3), famInfo varchar(5) not null, famDate date, bruInfo varchar(5) not null, bruDate date, tubeInfo varchar(5) not null, tubeDate date)";
const sql_add = "ALTER TABLE cowList MODIFY COLUMN id varchar(15) PRIMARY KEY";
const sql_insert =
  "INSERT INTO cowList(id, birthDate, sex, famInfo, famDate, bruInfo, bruDate, tubeInfo, tubeDate) VALUES('002 1465 4761 5', '2020-01-01', '거세', '해당없음', '2020-01-01', '해당없음', '2020-01-01', '해당없음', '2020-01-01')";
const sql_select = "SELECT * FROM cowList";
const sql_drop = "DROP TABLE cowList";
const sql_open = "GRANT ALL ON *.* TO gusdn0217@'%'";
const sql_flush = "FLUSH PRIVILEGES";
const sql_update = "UPDATE cowList SET id =";
const sql_addColumn = "ALTER TABLE cowList ADD room int(2) AFTER house";

// 데이터베이스 연결
connection.connect(function (err) {
  if (err) console.error("connection error: " + err);
  else console.log("connected successfuelly!");
});

let numbers = [];

for (let i = 0; i < records.length; i++) {
  console.log(`${i}/${records.length}`);
  if (records[i][1].length < 5) {
    let len = records[i][1].length;
    for (let l = 0; l < 5 - len; l++) {
      records[i][1] = "0" + records[i][1];
    }
  }
  let temp = {};
  temp.id = "00" + records[i][0] + records[i][1];

  if (records[i][2] == "out") {
    temp.house = "o";
    temp.room = 0;
  } else {
    temp.house = records[i][2].slice(0, 2);
    temp.room = records[i][2].slice(2, 4);
  }

  connection.query(
    `INSERT INTO cowList(id, house, room) VALUES('${temp.id}', '${temp.house}', ${temp.room})`,
    (error, results, fields) => {
      if (error) console.error(error);
      else console.log(`${numbers[i]} / ${records.length}`);
      //id = results[0].id;
    }
  );
}
// insert numbers
/*
for (let i = 0; i < numbers.length; i++) {
  connection.query(
    `INSERT INTO cowList(id) VALUES('${numbers[i]}')`,
    (error, results, fields) => {
      if (error) console.log(error);
      if (!error) console.log(numbers[i]);
      //id = results[0].id;
    }
  );
}
*/

// select all data
/*
connection.query(sql_select, (error, results, fields) => {
  if (error) console.log(error.sql);
  else console.log(results);
  //id = results[0].id;
});
*/
// update all data
/*
let numbers = [];

connection.query(`SELECT id FROM cowList`, (error, results, fields) => {
  if (error) console.log(error);
  else {
    for (let i = 0; i < results.length; i++) {
      numbers.push(results[i].id);
    }
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

        connection.query(sql_update, (error, results, fields) => {
          if (error) console.log(error);
          //else console.log(results);
        });
      });
    }
  }
});
*/
/*
connection.query(
  "ALTER TABLE cowList ADD age int(2) AFTER birthDate",
  (error, results, fields) => {
    if (error) console.log(error.sql);
    else console.log(results);
  }
);

connection.query(
  "ALTER TABLE cowList ADD room int(2) AFTER house",
  (error, results, fields) => {
    if (error) console.log(error.sql);
    else console.log(results);
  }
);


// add house room
for (let i = 0; i < numbers.length; i++) {
  connection.query(
    `UPDATE cowList SET house='b', room='${i / 4}' WHERE id='${numbers[i]}'`,
    (error, results, fields) => {
      if (error) console.log(error.sql);
      else console.log(results);
    }
    );
  }

  //delete all data
  connection.query("DELETE FROM cowList", (error, results, fields) => {
    if (error) console.error(error);
    else console.log(results);
  });
  */

// 연결 종료
connection.end();

async function readData(animalNo) {
  return await getHTML(animalNo).then((html) => {
    // 크롤링
    try {
      let myData = {};

      if (html != undefined) {
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

        if (stringList[1] != undefined) {
          let birthDate = stringList[1].title;
          myData.id = stringList[0].title;

          myData.birthDate = birthDate.slice(0, birthDate.indexOf(" "));
          myData.age = birthDate.slice(
            birthDate.indexOf("(") + 1,
            birthDate.indexOf(")") - 3
          );
        } else {
          myData.id = "-";
          myData.birthDate = "-";
          myData.age = "-";
        }
      } else {
        myData.id = "-";
        myData.birthDate = "-";
        myData.age = "-";
      }

      return myData;
    } catch (error) {
      console.error(error);
    }
  });
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
