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

router.get("/", async (req, res) => {
  const { id, ...etc } = req.query;

  let seqSetting = {
    where: { id: id },
    attributes: [
      ["id", "id"],
      ["famInfo", "famInfo"],
      ["famDate", "famDate"],
      ["bruInfo", "bruInfo"],
      ["bruDate", "bruDate"],
      ["tubeInfo", "tubeInfo"],
      ["tubeDate", "tubeDate"],
    ],
    order: [
      "id",
      "famInfo",
      "famDate",
      "bruInfo",
      "bruDate",
      "tubeInfo",
      "tubeDate",
    ],
    group: ["Vaccin.id"],
  };

  try {
    Vaccin.findAll(seqSetting).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
