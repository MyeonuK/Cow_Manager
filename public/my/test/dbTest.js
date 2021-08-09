// mysql 모듈 사용
const mysql = require("mysql");
const axios = require("axios");
const cheerio = require("cheerio");

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
}); /*
const numbers = [
  "002 1467 1543 2",
  "002 1465 4674 5",
  "002 1479 2976 3",
  "002 1479 0304 8",
  "002 1465 4139 7",
  "002 1474 8937 3",
  "002 1450 1688 0",
  "002 1465 4596 1",
  "002 1468 3604 3",
  "002 1480 1177 6",
  "002 1489 6428 2",
  "002 1465 3798 7",
  "002 1483 6762 8",
  "002 1464 0655 8",
  "002 1465 4808 9",
  "002 1462 5942 4",
  "002 1458 1719 8",
  "002 1464 0786 8",
  "002 1458 1718 0",
  "002 1464 0785 0",
  "002 1465 4568 9",
  "002 1495 0749 9",
  "002 1465 4094 0",
  "002 1465 4572 8",
  "002 1465 4574 4",
  "002 1465 4772 0",
  "002 1467 0765 8",
  "002 1465 4253 1",
  "002 1464 2960 1",
  "002 1479 3019 1",
  "002 1465 4669 0",
  "002 1468 3360 9",
  "002 1464 0763 9",
  "002 1465 4573 6",
  "002 1463 6892 1",
  "002 1465 4158 1",
  "002 1465 4768 2",
  "002 1479 0596 6",
  "002 1465 4039 4",
  "002 1464 3025 3",
  "002 1465 4771 1",
  "002 1465 4767 4",
  "002 1465 4571 0",
  "002 1464 0736 6",
  "002 1479 0326 5",
  "002 1474 7512 2",
  "002 1480 1594 8",
  "002 1479 0449 1",
  "002 1496 7286 1",
  "002 1465 4261 1",
  "002 1483 6761 0",
  "002 1453 4138 2",
  "002 1475 7557 2",
  "002 1480 1477 5",
  "002 1465 4765 8",
  "002 1465 4128 4",
  "002 1480 1479 1",
  "002 1479 2806 0",
  "002 1465 3975 5",
  "002 1465 3965 9",
  "002 1465 3932 9",
  "002 1465 3779 6",
  "002 1465 3951 1",
  "002 1465 3652 5",
  "002 1465 4806 4",
  "002 1465 4761 5",
];
*/

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
*/
// 연결 종료
connection.end();

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
      console.log(res.length);
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
        let index;
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
    //console.error(error);
  }
}
