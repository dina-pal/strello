const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    name: {
        type: 'string',
        required: [true, 'Username is required'],
    },
    email: {
        type: 'string',
        required: [true, 'Emails address is required'],
        validate: [isEmail, 'Please enter a valid email address'],
        unique: true,
    },
    password:{
        type: 'string',
        required: [true, 'Password is required'],
        minlength: [6, '6 or more characters required']
    },
    avatar: {
        type: 'string'
    },
    activated:{
        type: 'boolean',
        default: false,
    },
    role:{
        type: 'string',
        enum: ['admin', 'user'],
        default: 'user',
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


// Hash password before save it to the database.
userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) =>{
            if(err) return next(err);
            this.password = hash;
            next();
        })
    });
})


// Login password compare
userSchema.methods.comparePassword = function(password, next){
    bcrypt.compare(password, this.password, (err, isMatch) =>{
        if(err) return next(err);
        next(null, isMatch);
    });
}


const Users = model('users', userSchema);
module.exports = Users;