const { query } = require("express");
var request = require("request");

var url = "http://apis.data.go.kr/1611000/nsdi/map/CtnlgsSpceService";
var queryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=XW90cX0nEtt4m2vgJe4IKiYPFoodMcDMdQhWIo0SGwjCwgd%2FbbVDT2V4RjMMcKZpHI%2BcrxXkf144i1F956wgWA%3D%3D"; /* Service Key*/
queryParams +=
  "&" +
  encodeURIComponent("transparent") +
  "=" +
  encodeURIComponent("false"); /* */
queryParams +=
  "&" +
  encodeURIComponent("bgcolor") +
  "=" +
  encodeURIComponent("0xFFFFFF"); /* */
queryParams +=
  "&" +
  encodeURIComponent("exceptions") +
  "=" +
  encodeURIComponent("blank"); /* */
queryParams +=
  "&" + encodeURIComponent("layers") + "=" + encodeURIComponent("6"); /* */
queryParams +=
  "&" + encodeURIComponent("crs") + "=" + encodeURIComponent("EPSG:5174"); /* */
queryParams +=
  "&" +
  encodeURIComponent("bbox") +
  "=" +
  encodeURIComponent(
    "215107.681419355,451581.4768970783,215362.1975483873,451765.9285099815"
  ); /* */
queryParams +=
  "&" + encodeURIComponent("width") + "=" + encodeURIComponent("915"); /* */
queryParams +=
  "&" + encodeURIComponent("height") + "=" + encodeURIComponent("700"); /* */
queryParams +=
  "&" +
  encodeURIComponent("format") +
  "=" +
  encodeURIComponent("image/png"); /* */

request(
  {
    url: url + queryParams,
    method: "GET",
  },
  function (error, response, body) {
    console.log(url + queryParams);
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Reponse received", body);
  }
);
