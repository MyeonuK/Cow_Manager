console.log("hello");

const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
app.set("view engine", "ejs");
app.set(
  "views",
  path.join("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu", "/views")
);
app.use(
  "/",
  express.static(
    path.join("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu", "/public")
  )
);
app.get("/", (req, res) => {
  console.log("???");
  res.render("index.ejs");
});
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
