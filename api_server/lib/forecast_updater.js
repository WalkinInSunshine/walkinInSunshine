const https = require('https');
const http = require('http');

var API_KEY = '870e1d8314cbf00f2309e23133394e5f';
console.log('forecast_updater.js');

module.exports = exports = function(lat, lon) {
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
        var postOptions = {
          hostname: 'localhost',
          port: '3000',
          path: '/api/forecast',
          method: 'POST',
          json: true,
          headers: {
            'Content-Type': 'application/json'
          }
        };
        var postData = http.request(postOptions, () => {});
        var preppedData = JSON.stringify(schemeifiedData);
        postData.write(preppedData);
        postData.end();
      }
    });
  });
};
