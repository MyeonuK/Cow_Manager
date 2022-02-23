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

router.get("/count", async (req, res) => {
  const { type, house, ...etc } = req.query;

  try {
    switch (type) {
      case undefined:
      case "all":
        Profile.count().then((count) => {
          res.json(count);
        });
        break;

      case "house":
        House.count({
          where: { house: house },
        }).then((count) => {
          res.json(count);
        });
        break;

      case "room":
        House.count({
          where: { house: house },
          group: ["side", "room"],
        }).then((result) => {
          let resultArr = new Array(2);
          resultArr[0] = new Array(19);
          resultArr[1] = new Array(19);

          for (let item of result) {
            if (item.side == "L") {
              resultArr[0][item.room - 1] = item.count;
            } else {
              resultArr[1][item.room - 1] = item.count;
            }
          }
          res.json(resultArr);
        });
        break;
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/age", async (req, res) => {
  const { type, house, ...etc } = req.query;

  try {
    switch (type) {
      case "house":
        Profile.findAll({
          include: [
            {
              model: House,
              where: { house: house },
              attributes: [],
            },
          ],
          attributes: [["age", "age"]],
          group: ["Profile.id"],
        }).then((result) => {
          let averageAge =
            result.reduce((sum, current) => sum + current.dataValues.age, 0) /
            result.length;

          averageAge = Math.round(averageAge * 10) / 10;
          res.status(200).json(averageAge);
        });
        break;

      case "room":
        let resultArr = new Array(2);
        resultArr[0] = new Array(19);
        resultArr[1] = new Array(19);

        async function test(resultArr) {
          for (let i = 0; i < 19; i++) {
            await Profile.findAll({
              include: [
                {
                  model: House,
                  where: { house: house, side: "L", room: i + 1 },
                  attributes: [],
                },
              ],
              attributes: [["age", "age"]],
              group: ["Profile.id"],
            }).then((result) => {
              let averageAge =
                result.reduce(
                  (sum, current) => sum + current.dataValues.age,
                  0
                ) / result.length;

              averageAge = Math.round(averageAge * 10) / 10;
              resultArr[0][i] = averageAge;
            });

            await Profile.findAll({
              include: [
                {
                  model: House,
                  where: { house: house, side: "R", room: i + 1 },
                  attributes: [],
                },
              ],
              attributes: [["age", "age"]],
              group: ["Profile.id"],
            }).then((result) => {
              let averageAge =
                result.reduce(
                  (sum, current) => sum + current.dataValues.age,
                  0
                ) / result.length;

              averageAge = Math.round(averageAge * 10) / 10;
              resultArr[1][i] = averageAge;
            });
          }
          return resultArr;
        }
        test(resultArr).then((ress) => {
          res.status(200).json(ress);
        });
        break;

      case "all":
      default:
        break;
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/list", async (req, res) => {
  const { type, house, side, room, ...etc } = req.query;
  let seqSetting = {
    include: [
      {
        model: House,
      },
    ],
    attributes: [
      ["id", "id"],
      ["birthDate", "birthDate"],
      ["age", "age"],
      ["sex", "sex"],
    ],
    order: ["id", "age", "sex"],
    group: ["Profile.id"],
  };

  if (type == "house") {
    seqSetting.include[0].where = { house: house };
  } else if (type == "room") {
    seqSetting.include[0].where = { house: house, side: side, room: room };
  }

  try {
    Profile.findAll(seqSetting).then((result) => {
      res.json(result);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
