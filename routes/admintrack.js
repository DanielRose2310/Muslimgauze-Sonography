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
        //res.send(process.cwd())
        res.sendFile(path.join(process.cwd() + '/public/admin/addTrack.html'));

    } else {
        res.status(403).send({
            message: 'Access Forbidden'
        });
    }
})

module.exports = router;