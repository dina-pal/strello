const {Schema, model} = require('mongoose');
const tokenSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    token: {
        type: 'string',
    },
    expireAt: {
        type: Date,
        expires: 60 * 1 // seconds * minutes
    }
},
{
    timestamps: true
});

const Tokens = model('tokens', tokenSchema);
module.exports = Tokens;