const express = require("express");
const path = require("path");
const cors = require("cors");

const sequelize = require("./models").sequelize;
const indexRouter = require("./routes/index");
const cowRouter = require("./routes/cowRouter");
const houseRouter = require("./routes/houseRouter");
const vaccinRouter = require("./routes/vaccinRouter");
const territoryRouter = require("./routes/territoryRouter");

const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", express.static(path.join(__dirname, "./public")));
app.use("/", indexRouter);

app.use("/cow", cowRouter);
app.use("/house", houseRouter);
app.use("/vaccin", vaccinRouter);
app.use("/territory", territoryRouter);
app.use(cors());

app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
