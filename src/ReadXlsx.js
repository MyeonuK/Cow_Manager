class ReadXlsx {
  data = {};
  parsedData = null;

  constructor(filename) {
    this.readFile(filename);
  }

  readFile(filename) {
    fetch(filename)
      .then((res) => {
        return res.arrayBuffer();
      })
      .then((res) => {
        let workbook;
        workbook = XLSX.read(new Uint8Array(res), {
          type: "array",
        });

        for (let sheetName in workbook.Sheets) {
          this.data[sheetName] = {};
          this.data[sheetName]["len"] = 0;

          let temp = [];
          for (let cell in workbook.Sheets[sheetName]) {
            temp.push(workbook.Sheets[sheetName][cell].w);
          }
          temp.shift();

          let len = temp.length;
          for (let l = 0; l < len; l++) {
            let c = temp[l][0];
            if ("A" <= c && c <= "Z") {
              this.data[sheetName]["len"] += 1;
            } else {
              break;
            }
          }
        }
      });
    console.log("jhelelfwlfwekfweflwkejf");
    console.log(this.data);
  }
}
