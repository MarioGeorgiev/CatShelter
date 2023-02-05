const express = require('express')
const  SetDB = require('./db/initDB.js')



const app = express();
require('./config/express')(app);
//require('./config/routes')(app);




SetDB().then(app.listen(5000, console.log('Server is starting on port 5000....')))
