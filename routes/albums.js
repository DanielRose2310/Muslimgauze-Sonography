const express = require('express');
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { albumsModel,validAlbum } = require('../models/models_albums');
//const authToken = require("../middleware/auth");

router.get('/', async (req, res) => {
  albumsModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

router.get('/cataloguesearch/:str', async (req, res) => {
  let searchstring = req.params.str;
  await albumsModel.find({
      title: {
        $regex: searchstring,
        $options: 'si'
      }
    })
    .then(data => {
      console.log(searchstring)
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});
router.post("/add", (req, res) => {
  let valid = validAlbum(req.body);
  if (!valid.error) {
    albumsModel.insertMany([req.body])
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(400).json({
          err
        })
      })
  } else {
    res.status(400).json(valid.error.details);
  }
})

router.put("/edit", (req, res) => {
  let valid = validAlbum(req.body);
  if (!valid.error) {
    albumsModel.updateOne({
        _id: req.body._id
      }, req.body)
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.status(400).json({
          err
        })
      })
  } else {
    res.status(400).json(valid.error.details);
  }
})
router.delete("/del/:idDel", (req, res) => {
  let idDel = req.params.idDel;
  albumsModel.deleteOne({
    _id: idDel
  }, (err, data) => {
    if (err) {
      res.status(400).json(err)
    }
    res.json(data);
  })
})


module.exports = router;