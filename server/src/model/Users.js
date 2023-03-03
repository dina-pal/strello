const mongoose = require('mongoose');
const {isEmail} = require('validators');
const userSchema = mongoose.Schema({
    name: {
        typeof: 'string',
        required: [true, 'Username is required'],
    },
    email: {
        typeof: 'string',
        required: [true, 'Emails address is required'],
        validate: [isEmail, 'Please enter a valid email address'],
        unique: true,
    },
    password:{
        typeof: 'string',
        required: [true, 'Password is required']
    },
    avatar: {
        typeof: 'string'
    },
    boards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'boards',
        }
    ]
},
{
    timestamps: true
});

const Users = mongoose.model('users', userSchema);
module.exports = Users;