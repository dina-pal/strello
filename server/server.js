const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { dotEnvConfig } = require('./src/config/config');
const {middleware} = require('./src/middleware');
dotEnvConfig();

// Dot Env Configuration


const app = express();
const port = process.env.PORT || 8000;

// Static Setup
app.use(express.static(path.join(__dirname, 'public')));

// Setup Middleware
app.use(helmet());
app.use(middleware);
app.use(cookieParser());
// Router
app.use('/api/v1/', require('./src/routes/api'));
app.use('/', require('./src/routes/web'));

// initialize servers
app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
    const { dbConnection } = require('./src/config/db');
    dbConnection();
})