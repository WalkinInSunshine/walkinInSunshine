module.exports = exports = function(err, res) {
  if (err) throw err;
  res.status(500).json({ msg: 'server error' });
};
