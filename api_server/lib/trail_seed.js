module.exports = exports = function trailSeed() {
  const pathToFile = __dirname + '/trailData.json';
  const child = execFile('mongoimport', ['--db', 'db', '--collection', 'trails', '--type', 'json', '--file', pathToFile, '--jsonArray'], (error, stdout, stderr) => {
    if (error) {
      throw error;
      return;
    }
  });
}
