//const request = require("request");
const fetch = require("node-fetch");

//var xhr = new XMLHttpRequest();
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
  encodeURIComponent("160053500174");
/*
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
};*/

fetch(url + queryParams)
  .then((res) => {
    if (res.status === 200 || res.status === 201) {
      res.text().then((text) => console.log(text));
    } else {
      console.error(res.statusText);
    }
  })
  .catch((err) => console.log(err));
