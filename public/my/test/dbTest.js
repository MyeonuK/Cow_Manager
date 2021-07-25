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

const sql_create =
  "CREATE TABLE cowList(id varchar(15) not null, birthDate date, sex varchar(3), famInfo varchar(5) not null, famDate date, bruInfo varchar(5) not null, bruDate date, tubeInfo varchar(5) not null, tubeDate date)";
const sql_add = "ALTER TABLE cowList MODIFY COLUMN id varchar(15) PRIMARY KEY";
const sql_insert =
  "INSERT INTO cowList(id, birthDate, sex, famInfo, famDate, bruInfo, bruDate, tubeInfo, tubeDate) VALUES('002 1465 4761 5', '2020-01-01', '거세', '해당없음', '2020-01-01', '해당없음', '2020-01-01', '해당없음', '2020-01-01')";
const sql_select = "SELECT * FROM cowList";
const sql_drop = "DROP TABLE cowList";
const sql_open = "GRANT ALL ON *.* TO gusdn0217@'%'";
const sql_flush = "FLUSH PRIVILEGES";

// 데이터베이스 연결
connection.connect();

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
let id;

// insert numbers
/*
for (let i = 0; i < numbers.length; i++) {
  connection.query(
    `INSERT INTO cowList(id) VALUES(${numbers[i]})`,
    (error, results, fields) => {
      if (error) console.log(error.sql);
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
//readData(id);

// 연결 종료
connection.end();

readData("002 1465 3932 9");

function readData(animalNo) {
  getHTML(animalNo)
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
      // res로부터 파싱
      let myData = {};
      let num = res[0].title;
      let birthDate = res[1].title;
      let sex = res[3].title;
      let fam = res[10].title;
      let bru_date = res[11].title;
      let bru_info = res[12].title;
      let tube_date = res[13].title;
      let tube_info = res[14].title;

      // 개체번호, 생년월일, 성별
      myData.num = num;
      myData.birthDate = birthDate;
      myData.sex = sex;

      // 구제역
      for (let i = 0; i < fam.length; i++) {
        if (fam[i] != " " && fam[i] != "\t" && fam[i] != "\n") {
          myData.fam = fam.slice(i, fam.indexOf("\n", i - 1));
          break;
        }
      }

      // 브루셀라
      myData.bru_info = bru_info;
      if (bru_info == "해당 없음") {
        myData.bru_date = bru_date.slice(0, bru_date.indexOf("\n", 0));
      } else {
        let temp = "";
        let index;
        for (let i = 0; i < bru_date.length; i++) {
          if (
            bru_date[i] != " " &&
            bru_date[i] != "\t" &&
            bru_date[i] != "\n"
          ) {
            index = bru_date.indexOf("\n", i - 1);
            temp = bru_date.slice(i, bru_date.indexOf("\n", i - 1));
            break;
          }
        }
        for (let i = index; i < bru_date.length; i++) {
          if (
            bru_date[i] != " " &&
            bru_date[i] != "\t" &&
            bru_date[i] != "\n"
          ) {
            data.bru_date =
              temp + " " + bru_date.slice(i, bru_date.indexOf("\n", i - 1));
            break;
          }
        }
      }

      // 결핵
      for (let i = 0; i < tube_info.length; i++) {
        if (
          tube_info[i] != " " &&
          tube_info[i] != "\t" &&
          tube_info[i] != "\n"
        ) {
          myData.tube_info = tube_info.slice(i, tube_info.indexOf("\n", i - 1));
          break;
        }
      }

      for (let i = 0; i < tube_date.length; i++) {
        if (
          tube_date[i] != " " &&
          tube_date[i] != "\t" &&
          tube_date[i] != "\n"
        ) {
          myData.tube_date = tube_date.slice(i, tube_date.indexOf("\n", i - 1));
          break;
        }
      }

      // 업데이트 날짜
      let today = new Date();
      myData.update = today.toLocaleString();

      console.log(myData);
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
