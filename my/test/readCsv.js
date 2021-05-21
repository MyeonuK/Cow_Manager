const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const { title } = require("process");

const csv = fs.readFileSync("data/test.csv");
const records = parse(csv.toString());

let titles = [];
let items = [];
let numItem = records.length;
let numTitle = records[0].length;

for (let i of records[0]) {
  titles.push(i);
}
for (let i = 1; i < numItem; i++) {
  let tempObj = new Object();
  for (let j = 0; j < numTitle; j++) {
    tempObj[titles[j]] = records[i][j];
  }
  items.push(tempObj);
}
console.log(items);
