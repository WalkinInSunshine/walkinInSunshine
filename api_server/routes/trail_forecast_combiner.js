const Router = require('express').Router;
const mongoose = require('mongoose');
const trails = require('./../models/trail');
const weatherUpdater = require('./../lib/forecast_updater');

var trailForecastCombiner = module.exports = exports = Router();

module.exports = exports = function() {
  console.log('in forecast combiner');
  mongoose.createConnection('mongodb://localhost/db');

  // find trails
  trails.find(null, function(err, data) {
    console.log('trying to find trails');
    for (var i = 0; i < 10; i++) {
      // send trails lat/lon through the forecast updater
      weatherUpdater(data[i].lat, data[i].lon);
      console.log('data.lat', data[i].lat);
      console.log('data.lon', data[i].lon);
    };
  });
};
