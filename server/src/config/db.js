const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const mongodbUrl = process.env.MONGODB_URI;
module.exports.dbConnection = () =>{
    mongoose.connect(mongodbUrl)
    .then(() =>{
        console.log('database is connected');
    })
    .catch(e =>{
        console.log(`database connection error ${e}`);
    })
}