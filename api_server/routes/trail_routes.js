const Router = require('express').Router;
const Trails = require(__dirname + './../models/trail');
const bodyParser = require('body-parser').json();
const errorHandler = require(__dirname + './../lib/db_error_handler');
const weatherUpdater = require('./../lib/forecast_updater');
const http = require('http');

var trailsRouter = module.exports = Router();

// setting up route for user generated trail info
trailsRouter.post('/trails', bodyParser, (req, res) => {
  // double check - Trail refers to schema? Should line 2 be 'Trail'?
  // What else will need changing if it s/be 'Trail'?
  var newTrail = new Trail(req.body);
  newTrail.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200)
      .json(data);
  });
});

trailsRouter.get('/trailWeather/:id', (req, res) => {
  var weatherFetcher = weatherUpdater();
  Trails.findOne({ _id: req.params.id }, (err, trail) => {
    weatherFetcher.fetch(trail.lat, trail.lon);
    weatherFetcher.on('end', (weather) => {
      trail.weather = weather;
      trail.save(function(err, doc) {
        if (err) return errorHandler(err, res);
        res.status(200);
      });
    });
  });
});

// need this for trail_completer, which adds the forecast info to the trail
trailsRouter.get('/trails', (req, res) => {
  Trails.find(null, (err, data) => {
    if (err) return errorHandler(err, res);
    // TODO replace '5' with data.length before deployment
    for (var i = 0; i < 5; i++) {
      console.log('data[i][weather] : ', data[i]['weather'].length);
      if (data[i]['weather'].length === 0) {
        // TODO update localhost:3000 BEFORE deploying to Heroku/whatever
        var url = 'http://localhost:3000/api/trailWeather/' + data[i]._id;
        console.log('url: ', url);
        var request = http.get(url, (response) => {
          console.log('response code: ', response.statusCode);
        });
      }
    }
    res.status(200)
      .json(data);
  });
});

// may need to update trail data
trailsRouter.put('/trails/:id', (req, res) => {
  var trailData = req.body;
  delete trailData._id;
  Trails.remove({ _id: req.params.id }, trailData, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200)
      .json({ msg: 'Trail info has been updated.' });
  });
});

// in case someone enters some very wrong info
trailsRouter.delete('/trails/:id', (req, res) => {
  Trails.remove({ _id: req.params.id }, (err) => {
    if (err) return errorHandler(err, res);
    res.status(200)
      .json({ msg: 'Trail has been removed.' });
  });
});
