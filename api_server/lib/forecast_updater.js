const https = require('https');
const inherits = require('util').inherits;
const EventEmitter = require('events').EventEmitter;

var API_KEY = '870e1d8314cbf00f2309e23133394e5f';
console.log('forecast_updater.js');
module.exports = exports = WeatherEmitter;
function WeatherEmitter() {
  if (!(this instanceof WeatherEmitter)) return new WeatherEmitter();
  EventEmitter.call(this);
}
inherits(WeatherEmitter, EventEmitter);

WeatherEmitter.prototype.fetch = function(lat, lon) {
  console.log('hi, I\'m forecast updater');
  var url = 'https://api.forecast.io/forecast/' + API_KEY + '/' + lat + ',' + lon;

  var request = https.get(url, (response) => {
    response.setEncoding('utf-8');
    var buffer = '';
    var forecast;
    var headers = { 'Content-Type': 'application/json' };

    response.on('data', (chunk) => {
      buffer += chunk;
    });
    response.on('end', (err) => {
      try {
        forecast = JSON.parse(buffer);
      } catch (err) {
        return console.log(err);
      }
      var weatherArray = [];
      // Let's add some data to the db
      // It should overwrite whatever is there because it will change each day
      for (var i = 0; i < forecast.daily.data.length; i++) {
        var schemeifiedData = {
          lat: forecast.latitude,
          lon: forecast.longitude,
          day: forecast.daily.data[i].time,
          summary: forecast.daily.data[i].summary,
          icon: forecast.daily.data[i].icon,
          precipProbability: forecast.daily.data[i].precipProbability,
          temperatureMin: forecast.daily.data[i].temperatureMin,
          temperatureMax: forecast.daily.data[i].temperatureMax
        };
        var preppedData = JSON.stringify(schemeifiedData);
        weatherArray.push(preppedData);
      }
      console.log('weatherArray: ', weatherArray);
      this.emit('end', weatherArray);
    });
  });
};
