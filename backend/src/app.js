const express = require('express');
const cors = require('cors');
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 8080);
//MIDDLEWARES
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))


module.exports = app;
