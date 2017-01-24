const chai = require('chai');
const expect = chai.expect;
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');
const mongoose = require('mongoose');
const port = process.env.PORT = 5555;
const server = require(__dirname + '/../_server');
const Forecast = require(__dirname + '/../models/forecast');

console.log('in updater test');
describe('testing forecast locally', () => {
  before((done) => {
    server.listen(port, 'mongodb://localhost/trails_test_db', done);
    console.log('server on port ' + port);
  });

  before((done) => {
    var forecast = new Forecast({ lat: 44, lon: -121 });
    forecast.save((err, data) => {
      if (err) throw err;
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });

  it('should save an object to the database', (done) => {
    var check = Forecast.findOne({ lat: 44, lon: -121 }, (err, data) => {
      expect(data).to.be.an('object');
      expect(data.lat).to.equal(44);
      expect(data.lon).to.equal(-121);
      done();
    });
  });

  it('should save an array with a single entry to the database', (done) => {
    var check = Forecast.find({ lat: 44, lon: -121 }, (err, data) => {
      expect(data).to.be.an('array');
      expect(data.length).to.equal(1);
      expect(data[0].lat).to.equal(44);
      expect(data[0].lon).to.equal(-121);
      done();
    });
  });
});
