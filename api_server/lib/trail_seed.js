const execFile = require('child_process').execFile;
var trailSeed = function trailSeed() {
  const pathToFile = __dirname + '/trailData.json';
  console.log('in trail seed');
  const child = execFile('mongoimport', ['--db', 'db', '--collection', 'trails', '--type', 'json', '--file', pathToFile, '--jsonArray'], (error, stdout, stderr) => {
    if (error) {
      console.error('exec error:  ${error}');
      throw error;
      return;
    }
    console.log('stdout: ${stdout}');
    console.log('stderr: ${stderr}');
  });
}
trailSeed();
