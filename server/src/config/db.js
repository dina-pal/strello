const mongoose = require('mongoose');

const mongodbUrl = process.env.MONGODB_URI;
const dbConnection = () =>{
    mongoose.connect(mongodbUrl)
    .then(() =>{
        console.log('database is connected');
    })
    .catch(e =>{
        console.log(`database connection error ${e}`);
    })
}