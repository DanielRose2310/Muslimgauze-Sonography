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
        res.sendFile(path.join(process.cwd() + '/public/admin/addAlbum.html'));

    } else {
        res.status(403).send({
            message: 'Access Forbidden'
        });
    }
})
router.get(/[\.]/, function( req, res, next ) {
    res.send( "You are not supposed to be here." );
  } );
module.exports = router;