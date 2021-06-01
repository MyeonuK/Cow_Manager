class ReadXlsx {
  fileData = null;
  parsedData = null;

  constructor(filename) {
    this.readFile(filename);
  }

  getData() {
    console.log(this.parsedData);
    return this.parsedData;
  }

  readFile(filename) {
    fetch(filename)
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((res) => {
        this.fileData = XLSX.read(new Uint8Array(res), {
          type: "array",
        });

        this.parseData();
      });
  }

  parseData() {
    let sheet = this.fileData.Sheets.test;
    let cells = Object.keys(sheet);
    let cellValues = new Array();
    cells.shift();

    let titles = new Array();
    let cows = {};

    // cow 객체들과 titles 배열 생성
    async function test() {
      cells.forEach((cell) => {
        if (cell.slice(0, 1) == "A") {
          if (Number(cell.slice(1)) != 1) {
            cows[sheet[cell].v] = {};
          }
        } else if (Number(cell.slice(1)) == 1) {
          titles.push(sheet[cell].v);
        }

        cellValues.push(sheet[cell].v);
      });
    }
    // 각 cow 객체에 title에 맞는 값 저장
    test().then(() => {
      for (let i = 0; i < titles.length + 1; i++) {
        cellValues.shift();
      }

      Object.keys(cows).forEach((cow) => {
        cellValues.shift();
        for (let i = 0; i < titles.length; i++) {
          cows[cow][titles[i]] = cellValues.shift();
        }
      });
    });

    this.parsedData = cows;
    console.log(this.parsedData);
  }
}
