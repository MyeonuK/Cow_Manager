const express = require("express");
const app = express();
const PORT = 8001;
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.get("/", (req, res) => {
  res.render("index");
  console.log("wtff");
});
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
