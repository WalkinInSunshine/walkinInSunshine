const execFile = require('child_process').execFile;

// the following seeds the mongo DB with the trailData.json file
// only when 'npm install' is run. This should only need to be run
// once.
// TODO check for trails data in db
var trailSeed = function trailSeed() {
  const pathToFile = __dirname + '/trailData.json';
  const child = execFile('mongoimport', ['--db', 'db', '--collection', 'trails', '--type', 'json', '--file', pathToFile, '--jsonArray'], (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
  });
  console.log('trail collection seeded!');
};
trailSeed();
