const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  Profile,
  Vaccin,
  House,
  Territory,
  LatLng,
  Sequelize,
} = require("../models");

function writeLog(message) {
  let log = `=========${new Date()}=========\n${message}\n\n`;
  fs.appendFile("public/log/newDB.txt", log, function (err) {
    if (err) console.error(err);
    else console.log("===error===");
  });
  console.log("========= error appended =========");
}

router.get("/title", async (req, res) => {
  try {
    House.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("house")), "house"]],
      order: [["house", "ASC"]],
    }).then((result) => {
      res.json(result.map((r) => r.house));
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/room", function (req, res) {
  const { house, ...etc } = req.query;

  try {
    House.findAll({
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("room")), "room"]],
      order: [["room", "ASC"]],
      where: { house: house },
    }).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
