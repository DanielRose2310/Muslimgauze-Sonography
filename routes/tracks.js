const express = require('express');
const router = express.Router();
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const {
  tracksModel,
  validTrack
} = require("../models/models_tracks")
//const authToken = require("../middleware/auth");

router.get('/', async (req, res) => {
  tracksModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })

});

router.get('/titlesearch/:str', async (req, res) => {
  let searchstring = req.params.str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  await tracksModel.find({
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
router.get('/albumsearch/:str', async (req, res) => {
    let searchstring = req.params.str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  await tracksModel.find({
      "releases.albumtitle": {
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
router.get('/releaseformat/:str', async (req, res) => {
  let searchstring = req.params.str;
  await tracksModel.find({
      "releases.albumformat": {
        $regex: searchstring,
        $options: 'si'
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});

router.get('/years/:min/:max', async (req, res) => {
  let min = Number(req.params.min);
  let max = Number(req.params.max);
  await tracksModel.find({
      "releases.albumyear": {
        $gte: min,
        $lte: max
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    })
});


router.post("/add", (req, res) => {
  let valid = validTrack(req.body);
  if (!valid.error) {
    tracksModel.insertMany([req.body])
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
  let valid = validTrack(req.body);
  if (!valid.error) {
    tracksModel.updateOne({
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
  tracksModel.deleteOne({
    _id: idDel
  }, (err, data) => {
    if (err) {
      res.status(400).json(err)
    }
    res.json(data);
  })
})



module.exports = router;