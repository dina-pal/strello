const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
module.exports.middleware = [
    express.json(),
    morgan('dev'),
    cors()
];