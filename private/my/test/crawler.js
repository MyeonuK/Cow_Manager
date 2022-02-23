// crawler
const axios = require("axios");
const cheerio = require("cheerio");

class Crawler {
  data = {};

  constructor() {}

  readData(animalNo) {
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
      });

    return this.data;
  }

  async getHTML(animalNo) {
    try {
      return await axios.get(
        `https://www.mtrace.go.kr/mtracesearch/cattleNoSearch.do?btsProgNo=0109008401&btsActionMethod=SELECT&cattleNo=${animalNo}`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
