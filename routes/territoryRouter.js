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

router.get("/status", async (req, res) => {
  const { type, ...etc } = req.query;

  try {
    switch (type) {
      case undefined:
      case "all":
        Territory.count({
          group: ["status"],
        }).then((result) => {
          console.log(result.map((r) => r.count));
          res.json(result.map((r) => r.count));
        });
        break;
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/", async (req, res) => {
  let seqSetting = {
    include: [{ model: LatLng }],
    attributes: [["code", "code"], [""]],
  };

  try {
    Territory.findAll(seqSetting).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
