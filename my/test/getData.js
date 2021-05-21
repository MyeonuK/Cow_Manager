const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");

const category = [
  "AnimalNo",
  "BirthDate",
  "Sex",
  "HouseNo",
  "CageNo",
  "Fam",
  "Brucella",
  "Tube",
  "Update",
];
let myData = {};

async function getHTML() {
  try {
    return await axios.get(
      "https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=002143367697"
    );
  } catch (error) {
    console.error(error);
  }
}

getHTML()
  .then((html) => {
    let titleList = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("div.infTb")
      .children("table")
      .children("tbody")
      .children("tr")
      .children("td")
      .children("span");

    //const brucella

    bodyList.each(function (i, elem) {
      titleList[i] = {
        title: $(this).text(),
      };
    });

    return titleList;
  })
  .then((res) => {
    myData.fam = res[2];
    myData.brucella = [res[3], res[4]];
    myData.tube = [res[5], res[6]];

    const workSheet = xlsx.utils.json_to_sheet(data);
  });
