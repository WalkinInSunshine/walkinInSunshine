const Router = require('express').Router;
const Trails = require(__dirname + './../models/trail');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + './../lib/db_error_handler');
const weatherUpdater = require('./../lib/forecast_updater');

var trailsRouter = module.exports = Router();

// setting up route for user generated trail info
trailsRouter.post('/trails', bodyParser, (req, res) => {
  var newTrail = new Trail(req.body);
  newTrail.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200).json(data);
  });
});

// need this for trail_completer, which adds the forecast info to the trail
trailsRouter.get('/trails', (req, res) => {
  Trails.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    console.log(data);
    res.status(200).json(data);
  });
});

// may need to update trail data
trailsRouter.put('/trails/:id', (req, res) => {
  var trailData = req.body;
  delete trailData._id;
  Trails.remove({ _id: req.params.id }, trailData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'Trail info has been updated.' });
  });
});

// in case someone enters some very wrong info
trailsRouter.delete('/trails/:id', (req, res) => {
  Trails.remove({ _id: req.params.id}, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200).json({ msg: 'Trail has been removed.' });
  });
});
