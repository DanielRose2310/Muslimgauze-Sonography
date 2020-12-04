const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");
var path = require('path');

const {
    userModel,
    validUser,
    validLogin,
    genToken
} = require("../models/models_users")

router.get("/", authToken, async (req, res) => {
    
    let valid = validUser(req.body);
    if (!valid.error) {
        //res.send('in')
        res.sendFile(path.join(__dirname + '/admin/addalbum.html'));

    } else {
        res.status(403).send({
            message: 'Access Forbidden'
        });
    }
})


module.exports = router;