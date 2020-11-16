const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    user: String,
    pass: String,
    date_time: {
      type: Date, default: Date.now
    }
  }, { retainKeyOrder: true });
  
  const userModel = mongoose.model("users",userSchema);
  exports.userModel = userModel;


const genToken = (_user,_id) => {
    const token = jwt.sign({name:_name,_id:_id}, "mytoken",{expiresIn:"72h"});
    return token;
  }
  
  exports.genToken = genToken;
  

const validUser = (_userObj) => {
    let schema = Joi.object({
      id:Joi.any(),
      user:Joi.string().min(2).max(50),
      pass:Joi.string().min(1).max(50),

    })
    return schema.validate(_userObj);
  }
  exports.validUser=validUser;


const validLogin = (_userObj) => {
    let schema = Joi.object({
      user:Joi.string().min(2).max(50).required(),
      pass:Joi.string().min(1).max(50).required(),  
    })
    return schema.validate(_userObj);
  }

  
  exports.validLogin = validLogin;

   