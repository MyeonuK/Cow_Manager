const express = require("express");
const path = require("path");
const cors = require("cors");

const indexRouter = require("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/routes/index");
//const indexRouter = require("./routes/index");

const app = express();
const PORT = 8001;

// view engine setup (cafe24)

app.set("view engine", "ejs");
app.set("views", "/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/views");

app.use(
  "/",
  express.static("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/public")
);

// view engine setup (local)
/*
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use("/", express.static(path.join(__dirname, "./public")));
*/
//
app.use("/", indexRouter);
app.use(cors());

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
