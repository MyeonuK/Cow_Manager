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

// create 쿼리문 사용
let id;
connection.query(sql_select, (error, results, fields) => {
  if (error) throw error;
  else console.log(results);
  //id = results[0].id;
});

//readData(id);

// 연결 종료
connection.end();

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
      console.log(stringList);
      return stringList;
    })
    .then((res) => {
      // res로부터 파싱
      /*
      let num = res[0].title;
      let birthDate = res[1].title;
      let sex = res[3].title;
      let fam = res[10].title;
      let bru_date = res[11].title;
      let bru_info = res[12].title;
      let tube_date = res[13].title;
      let tube_info = res[14].title;

      // 개체번호, 생년월일, 성별
      this.data.num = num;
      this.data.birthDate = birthDate;
      this.data.sex = sex;

      // 구제역
      for (let i = 0; i < fam.length; i++) {
        if (fam[i] != " " && fam[i] != "\t" && fam[i] != "\n") {
          this.data.fam = fam.slice(i, fam.indexOf("\n", i - 1));
          break;
        }
      }

      // 브루셀라
      this.data.bru_info = bru_info;
      if (bru_info == "해당 없음") {
        this.data.bru_date = bru_date.slice(0, bru_date.indexOf("\n", 0));
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
          this.data.tube_info = tube_info.slice(
            i,
            tube_info.indexOf("\n", i - 1)
          );
          break;
        }
      }

      for (let i = 0; i < tube_date.length; i++) {
        if (
          tube_date[i] != " " &&
          tube_date[i] != "\t" &&
          tube_date[i] != "\n"
        ) {
          this.data.tube_date = tube_date.slice(
            i,
            tube_date.indexOf("\n", i - 1)
          );
          break;
        }
      }

      // 업데이트 날짜
      let today = new Date();
      this.data.update = today.toLocaleString();

      myData.push(data);
      */
    });

  return this;
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
