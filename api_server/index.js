if (!process.env.MONGO_URI) { console.log('Ensure MONGO_URI is set to \'mongodb://localhost/db\' to access full db.');}

// var port = process.env.PORT || 3000;
// var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/db';
// console.log('Accessing db at: ', mongoUri);
var app = require(__dirname + '/_server.js');
// app.listen(port);
// console.log('server working on port:' + port);
