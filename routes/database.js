// mysql 모듈 사용
const axios = require("axios");
const cheerio = require("cheerio");
const mysql = require("mysql");

let dbInfo = {
  host: "myeonu.cafe24app.com",
  user: "gusdn0217",
  password: "Dbdb4783!",
  database: "gusdn0217",
  port: "3306",
};

const conn = mysql.createConnection(dbInfo);
conn.connect(function (err) {
  if (err) console.error("connection error: " + err);
  else console.log("connected successfuelly!");
});

function update(req, res, conn) {
  for (let i of numbers) {
    readData(i)
      .then((data) => {
        let sql_update = `UPDATE cowList SET birthDate='${data.birthDate}', sex='${data.sex}', famInfo='${data.famInfo}', famDate='${data.famDate}', bruInfo='${data.bruInfo}', bruDate='${data.bruDate}', tubeInfo='${data.tubeInfo}', tubeDate='${data.tubeDate}' WHERE id='${data.id}'`;

        conn.query(sql_update, (error, results, fields) => {
          if (error) console.log(error);
          else console.log(results);
        });
      })
      .then((result) => {
        res.status(200).json(rows);
      });
  }
}

function load(id) {
  let sql = `SELECT * FROM cowList WHERE id="${id}"`;

  if (id == null) {
    sql = `SELECT * FROM cowList`;
  }

  conn.query(sql, function (err, rows, fields) {
    console.log(rows[0]);
    if (err) {
      console.error(err);
    } else {
      let arr = [];
      for (let data of rows) {
        arr.push(data);
      }
      console.log(arr);
      return JSON.stringify(arr);
      return JSON.stringify(rows);
    }
  });
}

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

      // 개체번호, 생년월일, 성별
      myData.id = id;
      myData.sex = sex;

      // 생년월일, 나이
      myData.birthDate = birthDate.slice(0, birthDate.indexOf(" "));
      myData.age = birthDate.slice(
        birthDate.indexOf("(") + 1,
        birthDate.length - 4
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
        myData.bruDate = bruDate.slice(0, bruDate.indexOf("\n", 0));
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
        for (let i = index; i < bruDate.length; i++) {
          if (bruDate[i] != " " && bruDate[i] != "\t" && bruDate[i] != "\n") {
            myData.bruDate =
              temp + " " + bruDate.slice(i, bruDate.indexOf("\n", i - 1));
            break;
          }
        }
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
        myData.tubeDate = "";
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

module.exports.update = update;
module.exports.load = load;
