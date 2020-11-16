const express = require('express');
const {
  userModel,
  validUser,
  validLogin,
  genToken
} = require("../models/models_users")
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");

/* GET users listing. */
router.get('/', async (req, res) => {
  // 1 - אומר להציג
  // 0 - אל תציד רק את המאפין הנל
  userModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});



router.get('/userInfo', authToken, async (req, res) => {

  userModel.find({
      _id: req._id
    })

    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});


router.get('/all', authToken, async (req, res) => {

  // TODO: רק אם יש טוקן תקני ייתן לי לצפות בעמוד הנל
  userModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

router.post("/login", async (req, res) => {
  // לפני שנגש למסד נתונים בודקים שבכלל נשלח מידע תקין של מייל וסיסמא
  let valid = validLogin(req.body);
  if (!valid.error) {
    try {
      // find -> מחזיר מערך
      let dataDB = await userModel.findOne({
        user: req.body.user
      })
      if (dataDB) {
        // console.log
        // בודק מול המסד נתונים שהמידע המוצפן של פאסס שווה לפאסס שקיבל בבאדי
        let validPass = await bcrypt.compare(req.body.pass, dataDB.pass)
        if (!validPass) {
          res.json({
            message: "INVALID PASSWORD"
          })
        } else {
          let newToken = genToken(dataDB.user, dataDB._id)
          res.json({
            token: newToken
          })
        }
      } else {
        res.status(400).json(valid.error.details);


      }
    } catch (err) {
      res.status(400).json(err);
      console.log(err)
    }
  } else {
    res.status(400).json(valid.error.details);
  }
})


router.post("/add", async (req, res) => {

  let valid = validUser(req.body);
  if (!valid.error) {
    let salt = await bcrypt.genSalt(10);
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    try {
      let data = await userModel.insertMany([req.body]);
      //let dataHidden = _.pick(data[0], ["user", "email", "_id", "date_time"])
      res.json("201")
    } catch (err) {
      res.status(400).json("User already in system");
    }
  } else {
    res.status(400).json(valid.error.details);
  }
})


router.put("/edit", authToken, async (req, res) => {
  let valid = validUser(req.body);
  if (!valid.error) {
    let salt = await bcrypt.genSalt(10);
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    try {
      let data = await userModel.updateOne({
        email: req.body.email
      }, req.body);
      res.json(data)
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(400).json(valid.error.details);
  }
})


router.post('/reset', async (req, res) => {
  userModel.deleteMany({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

module.exports = router;