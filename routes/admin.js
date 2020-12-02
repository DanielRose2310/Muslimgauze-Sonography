const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");
const {
    userModel,
    validUser,
    validLogin,
    genToken
  } = require("../models/models_users")

router.get("/", authToken, async (req, res) => {
    let valid = validUser(req.body);
    console.log(req.body)
    if (!valid.error) {
        app.use(express.static(__dirname + '/admin'));

    } else {
        res.status(403).send({
            message: 'Access Forbidden'
         });    }
  })
  

module.exports = router;