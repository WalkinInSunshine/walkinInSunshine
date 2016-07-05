const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/build'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT, PATCH');
  next();
});
module.exports = exports = {
  server: {
    close: function() {
      throw new Error('Server not started yet!');
    }
  },
  listen: function(port, mongoString, cb) {
    mongoose.connect(mongoString);

    return this.server = app.listen(port, cb);
  },
  close: function(cb) {
    this.server.close();
    if (cb) cb();
  }
};
