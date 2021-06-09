const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML() {
  try {
    return await axios.getr(
      "http://patent.ordernow.kr/event_list_for_super.php"
    );
  } catch (error) {
    console.error(error);
  }
}

getHTML().then((html) => {
  const $ = cheerio.load(html.data);
  const $bodyList = $("table#list")
    .children("tbody")
    .children("tr")
    .children("td:nth-child(2)")
    .children("td");

  for (let i in $bodyList) {
    console.log(i);
  }
});
