const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const errorHandler = require(__dirname + '/../lib/db_error_handler');

const mongoose = require('mongoose');
const port = process.env.PORT = 5555;
console.log('forecast server test, port:', port);
const server = require(__dirname + '/../_server');
const Forecast = require(__dirname + '/../models/forecast');

describe('Call to Forecast.io server should have lat and lon', () => {
  beforeEach((done) => {
    server.listen(port, 'mongodb://localhost/forecast_test_db', done);
    console.log('test server on port:', port);
  });

  beforeEach((done) => {
    var forecast = new Forecast({ lat: 47.6205, lon: -122.3493 });
    forecast.save((err, data) => {
      if (err) throw err;
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(() => {
        server.close(done);
      });
    });
  });
  // testing post route
  it('should be able to POST forecast data for one location', (done) => {
    request('localhost:' + port)
    .post('/api/forecast')
    .send({
      lat: 47.6205,
      lon: -122.3493
      })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.lat).to.eql(47.6205);
      expect(res.body.lon).to.eql(-122.3493);
      done();
    })
  })
  // testing get route
  it('should be able to GET forecast data for one location', (done) => {
    request('localhost:' + port)
    .get('/api/forecast?lat=47.6205&lon=-122.3493')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.an('object');
      expect(res.body.lat).to.eql(47.6205);
      expect(res.body.lon).to.eql(-122.3493);
      done();
    })
  })

  it('should give an error if no lat or lon provided', (done) => {
    request('localhost:' + port)
    .get('/api/forecast')
    .send({
      lat: null,
      lon: null
      })
    .end((err, res) => {
      expect(err).to.not.equal(null);
      expect(res.status).to.eql(500);
      expect(res.status).to.not.eql(200);
      expect(res.text).to.equal('lat and lon are required\n');
      done();
    })
  })

})
