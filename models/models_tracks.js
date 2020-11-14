  const mongoose = require("mongoose");
  const Joi = require("joi");
  const jwt = require("jsonwebtoken");
//const { join } = require("lodash");

const trackSchema = new mongoose.Schema({
    title: String,
    alt:String,
    releases: Array,
    date_time: {
      type: Date, default: Date.now
    }
  })
  
  const tracksModel = mongoose.model("tracks",trackSchema)

  exports.tracksModel = tracksModel

  
  const validTrack = (_itemObj) => {
    let schema = Joi.object({
      _id:Joi.any(),
      title:Joi.string(),
      alt:Joi.string(),
      releases:Joi.array().items(Joi.object()),
      
    })
    return schema.validate(_itemObj);
  }
  
  exports.validTrack = validTrack;

   