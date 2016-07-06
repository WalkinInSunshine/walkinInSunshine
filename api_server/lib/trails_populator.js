var http = require('http');

module.exports = exports = () => {
  // Let's add some data to the db, starting with traildata.json
  // It should be able to overwrite whatever is there if a user mods a trail
  var trailData = require('./../../trailData.json');

  for (var i = 0; i < trailData.length; i++) {
    var schemeifiedTrail = {
      trailName: trailData.trailName,
      lat: trailData.lat,
      lon: trailData.lon,
    };
    var postOptions = {
      hostname: 'localhost',
      port: '3000',
      path: '/api/trail',
      method: 'POST',
      json: true,
      headers: { 'Content-Type': 'application/json' }
    };
    var postData = http.request(postOptions, () => {});
    var preppedData = JSON.stringify(schemeifiedTrail);
    postData.write(preppedData);
    postData.end();
  };
}
