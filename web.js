const express = require("express");
const path = require("path");

const indexRouter = require("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/routes/index");
//const indexRouter = require("./routes/index");
//const userRouter = require("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/routes/users");
//const userRouter = require("./routes/users");

const app = express();
const PORT = 8001;

// view engine setup
app.set("views", "/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/views");
//app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

/*
app.use(
  "/",
  //express.static("/home/hosting_users/gusdn0217/apps/gusdn0217_myeonu/public")
  express.static(path.join(__dirname, "./public"))
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
*/
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
