// crawler
const axios = require("axios");
const cheerio = require("cheerio");

// csv rw
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
const { attr } = require("cheerio/lib/api/attributes");
const csv = fs.readFileSync("newdata.csv");
const records = parse(csv.toString());

// csv 읽어오기
let items = [];
/*
reading().then((res) => {
  console.log("last~~");
  const csv_string = jsonToCSV(items);
  fs.writeFileSync("shhhh.csv", "\uFEFF" + csv_string);
});
*/
reading();
setTimeout(() => {
  console.log("last~~");
  console.log(items);
  const csv_string = jsonToCSV(items);
  fs.writeFileSync("shhhh.csv", "\uFEFF" + csv_string);
}, 3000);

function reading() {
  return new Promise(() => {
    for (let i = 0; i < records.length; i++) {
      console.log(`${i}/${records.length}`);
      if (records[i][1].length < 5) {
        let len = records[i][1];
        for (let l = 0; l < 5 - len; l++) {
          records[i][1] = "0" + records[i][1];
        }
      }
      let temp = records[i][0] + records[i][1];
      if (i == 0) {
        temp = temp.slice(1, 13);
      }
      temp = "00" + temp;
      //items.push(temp);

      if (temp == "") {
        //items.push("");
        //items.push("");
      } else {
        readData(temp).then((arr) => {
          console.log(arr);
          if (arr.id == "-") {
            items.push(temp);
          } else {
            items.push(arr.id);
          }
          items.push(arr.birthDate);
          items.push(arr.age + "개월");
          items.push(records[i][2]);
        });
      }
    }
    console.log(items);
  });
}

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

      //console.log("mydata");
      //console.log(myData);
      //console.log(myData);

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

function jsonToCSV(data) {
  console.log(data.length);
  let csv_string = "";

  for (let i = 0; i < data.length; i += 4) {
    //csv_string += `${data[i]},${data[i + 1]},${data[i + 2]}\r\n`;
    csv_string += `${data[i]},${data[i + 1]},${data[i + 2]},${data[i + 3]}\r\n`;
  }

  return csv_string;
}
