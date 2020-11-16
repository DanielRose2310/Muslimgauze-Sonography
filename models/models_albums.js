const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
//const { join } = require("lodash");

const albumSchema = new mongoose.Schema({
  title: String,
  page: String,
  src: String
})

const albumsModel = mongoose.model("albums",albumSchema)

exports.albumsModel = albumsModel


const validAlbum = (_itemObj) => {
  let schema = Joi.object({
    _id:Joi.any(),
    title:Joi.string(),
    page:Joi.string(),
    src:Joi.string(),
    
  })
  return schema.validate(_itemObj);
}

exports.validAlbum = validAlbum;

 