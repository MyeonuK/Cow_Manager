// crawler
const axios = require("axios");
const cheerio = require("cheerio");

// csv rw
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const csv = fs.readFileSync("data/data.csv");
const records = parse(csv.toString());

// csv 읽어오기
let items = [];
let numItem = records.length;

for (let i = 1; i < numItem; i++) {
  let temp =
    "002" + records[i][0].substring(0, 4) + records[i][0].substring(5, 10);

  items.push(temp);
}

// 크롤링
let myData = [];

for (let i = 0; i < numItem - 1; i++) {
  readData(items[i]);
}
setTimeout(function () {
  console.log(myData);
  const csv_string = jsonToCSV(myData);
  fs.writeFileSync("shhhh.csv", "\uFEFF" + csv_string);
}, 1000);

/*
ggggg().then((result) => {
  console.log(myData);
});
async function ggggg() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < numItem - 1; i++) {
      readData(items[i]);
    }
    resolve(1);
  });
}
*/
//readData("002146429601");

async function getHTML(animalNo) {
  try {
    return await axios.get(
      `https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=${animalNo}`
    );
  } catch (error) {
    console.error(error);
  }
}

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

      return stringList;
    })
    .then((res) => {
      // res로부터 파싱
      let data = {};

      let num = res[0].title;
      let birthDate = res[1].title;
      let sex = res[3].title;
      let fam = res[10].title;
      let bru_date = res[11].title;
      let bru_info = res[12].title;
      let tube_date = res[13].title;
      let tube_info = res[14].title;

      // 개체번호, 생년월일, 성별
      data.num = num;
      data.birthDate = birthDate;
      data.sex = sex;

      // 구제역
      for (let i = 0; i < fam.length; i++) {
        if (fam[i] != " " && fam[i] != "\t" && fam[i] != "\n") {
          data.fam = fam.slice(i, fam.indexOf("\n", i - 1));
          break;
        }
      }

      // 브루셀라
      data.bru_info = bru_info;
      if (bru_info == "해당 없음") {
        data.bru_date = bru_date.slice(0, bru_date.indexOf("\n", 0));
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
          data.tube_info = tube_info.slice(i, tube_info.indexOf("\n", i - 1));
          break;
        }
      }

      for (let i = 0; i < tube_date.length; i++) {
        if (
          tube_date[i] != " " &&
          tube_date[i] != "\t" &&
          tube_date[i] != "\n"
        ) {
          data.tube_date = tube_date.slice(i, tube_date.indexOf("\n", i - 1));
          break;
        }
      }

      // 업데이트 날짜
      let today = new Date();
      data.update = today.toLocaleString();

      myData.push(data);
    });

  return;
}

function jsonToCSV(json_data) {
  // 1-1. json 데이터 취득
  const json_array = json_data;
  // 1-2. json데이터를 문자열(string)로 넣은 경우, JSON 배열 객체로 만들기 위해 아래 코드 사용
  // const json_array = JSON.parse(json_data);

  // 2. CSV 문자열 변수 선언: json을 csv로 변환한 문자열이 담길 변수
  let csv_string = "";

  // 3. 제목 추출: json_array의 첫번째 요소(객체)에서 제목(머릿글)으로 사용할 키값을 추출
  const titles = Object.keys(json_array[0]);

  // 4. CSV문자열에 제목 삽입: 각 제목은 컴마로 구분, 마지막 제목은 줄바꿈 추가
  titles.forEach((title, index) => {
    csv_string += index !== titles.length - 1 ? `${title},` : `${title}\r\n`;
  });

  // 5. 내용 추출: json_array의 모든 요소를 순회하며 '내용' 추출
  json_array.forEach((content, index) => {
    let row = ""; // 각 인덱스에 해당하는 '내용'을 담을 행

    for (let title in content) {
      // for in 문은 객체의 키값만 추출하여 순회함.
      // 행에 '내용' 할당: 각 내용 앞에 컴마를 삽입하여 구분, 첫번째 내용은 앞에 컴마X
      row += row === "" ? `${content[title]}` : `,${content[title]}`;
    }

    // CSV 문자열에 '내용' 행 삽입: 뒤에 줄바꿈(\r\n) 추가, 마지막 행은 줄바꿈X
    csv_string += index !== json_array.length - 1 ? `${row}\r\n` : `${row}`;
  });

  // 6. CSV 문자열 반환: 최종 결과물(string)
  return csv_string;
}
//const workSheet = xlsx.utils.json_to_sheet(data);
