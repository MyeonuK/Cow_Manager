const express = require("express");
//const path = require("path");
const app = express();
const PORT = 8001;
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "/views"));
//app.use("/", express.static(path.join(__dirname, "/public")));
app.get("/", (req, res) => {
  console.log("???");
  res.render("index");
});
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
