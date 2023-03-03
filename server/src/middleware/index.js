const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
module.exports.middleware = [
    express.json(),
    morgan('dev'),
    cors()
];

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Object} Token Payload {payload} will be returned.
 */
module.exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies.jwt_sign_token;
    if(token === undefined) {
       return res.redirect('/home')
    }else{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.payload = payload;
        next();
    }  
    
};