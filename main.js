console.log("hello");
/*myData = [];

const axios = require("axios");
const cheerio = require("cheerio");

function readXLSX(fileName) {
  let data = {};

  fetch(fileName)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((res) => {
      let workbook;
      workbook = XLSX.read(new Uint8Array(res), {
        type: "array",
      });

      for (let sheetName in workbook.Sheets) {
        data[sheetName] = {};
        data[sheetName]["len"] = 0;

        let tempArr = [];
        for (let cell in workbook.Sheets[sheetName]) {
          tempArr.push(workbook.Sheets[sheetName][cell].w);
        }
        tempArr.shift();

        // count number of column -> data[sheetName]["len"]
        let len = tempArr.length;
        for (let l = 0; l < len; l++) {
          let c = tempArr[l][0];
          if ("A" <= c && c <= "z") {
            data[sheetName]["len"] += 1;
          } else {
            break;
          }
        }

        function parseData(sheet, dataArr, object) {
          let contentsNum = object[sheet]["len"];
          let length = dataArr.length;
          object[sheet]["arr"] = [];

          for (let i = 0; i < length / contentsNum; i++) {
            object[sheet]["arr"].push(dataArr.splice(0, contentsNum));
          }
        }

        parseData(sheetName, tempArr, data);
      }
    });
  console.log(data);

  return data;
}

async function getHTML() {
  try {
    return await axios.get(
      "https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=002143367697"
    );
  } catch (error) {
    console.error(error);
  }
}

let dataObject = readXLSX("/data/test.xlsx");
getHTML()
  .then((html) => {
    let titleList = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("div.infTb2")
      .children("table")
      .children("tbody")
      .children("tr")
      .children("td")
      .children("span.vol4");

    bodyList.each(function (i, elem) {
      titleList[i] = {
        title: $(this).text(),
      };
    });
    return titleList;
  })
  .then((res) => {
    console.log(res.length);
    myData.push(res[res.length - 1]);
    console.log(myData);
  });
*/

var xhr = new XMLHttpRequest();
var url =
  "http://data.ekape.or.kr/openapi-data/service/user/grade/confirm/issueNo";
var queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  "=" +
  "XW90cX0nEtt4m2vgJe4IKiYPFoodMcDMdQhWIo0SGwjCwgd%2FbbVDT2V4RjMMcKZpHI%2BcrxXkf144i1F956wgWA%3D%3D";
queryParams +=
  "&" +
  encodeURIComponent("animalNo") +
  "=" +
  encodeURIComponent("002148964282");
xhr.open("GET", url + queryParams);
xhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    alert(
      "Status: " +
        this.status +
        "nHeaders: " +
        JSON.stringify(this.getAllResponseHeaders()) +
        "nBody: " +
        this.responseText
    );
  }
};

xhr.send("");

/*
var request = require("request");

var url =
  "http://data.ekape.or.kr/openapi-data/service/user/grade/confirm/issueNo";
var queryParams =
  "?" +
  encodeURIComponent("ServiceKey") +
  "=XW90cX0nEtt4m2vgJe4IKiYPFoodMcDMdQhWIo0SGwjCwgd%2FbbVDT2V4RjMMcKZpHI%2BcrxXkf144i1F956wgWA%3D%3D"; 
queryParams +=
  "&" +
  encodeURIComponent("animalNo") +
  "=" +
  encodeURIComponent("160053500174");

request(
  {
    url: url + queryParams,
    method: "GET",
  },
  function (error, response, body) {
    //console.log('Status', response.statusCode);
    //console.log('Headers', JSON.stringify(response.headers));
    //console.log('Reponse received', body);
  }
);
*/
