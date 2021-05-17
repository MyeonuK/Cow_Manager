const axios = require("axios");
const cheerio = require("cheerio");
let myData = [];

async function getHTML() {
  try {
    return await axios.get(
      "https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=002143367697"
    );
  } catch (error) {
    console.error(error);
  }
}

//let dataObject = readXLSX("/data/test.xlsx");
getHTML()
  .then((html) => {
    let titleList = [];
    const $ = cheerio.load(html.data);
    const fam = $("div.infTb")
      .children("table")
      .children("tbody")
      .children("tr")
      .children("td.fir")
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
    console.log(res.length);
    myData.push(res[res.length - 1]);
    console.log(myData);
  });
