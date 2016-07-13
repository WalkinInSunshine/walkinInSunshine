const Router = require('express').Router;
const Forecast = require(__dirname + '/../models/forecast');
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const forecastData = require(__dirname + '/../lib/forecast_updater');
const bodyParser = require('body-parser').json();

var forecastRouter = module.exports = exports = Router();


forecastRouter.get('/forecast', bodyParser, (req, res) => {
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    return errorHandler('lat and lon are required');
  }
  // need to findOne b/c the data model expects there to only be one entry per
  // lat/lon pair.
  Forecast.findOne(req.query, (err, data) => {
    if (err) return errorHandler(err, res);
    if (data === null) {
      forecastData(req.query.lat, req.query.lon);
      console.log('forecastData called');
      Forecast.findOne(req.query, (err, data) => {
        if (err) return errorHandler(err);
        res.status(200)
          .json(data);
      });
    } else {
      res.status(200)
        .json(data);
    }
  });
});

forecastRouter.post('/forecast', bodyParser, (req, res) => {
  var newForecast = new Forecast(req.body);
  newForecast.validate((err) => {
    if (err) {
      console.log('calling error handler');
      return errorHandler(err);
    }
  });
  newForecast.save((err, data) => {
    if (err) return errorHandler(err, res);
    res.status(200)
      .json(data);
  });
});
