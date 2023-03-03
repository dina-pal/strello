const mongoose = require('mongoose');
const boardSchema = mongoose.Schema({
    name: {
        typeof: 'string',
        required: [true, 'Board name is required'],
    },
    background: {
        typeof: 'string',
    },
    ownerId:{
        typeof: Schema.Types.ObjectId,
        ref: 'users',
    },
    memberIds: [
        {
            typeof: Schema.Types.ObjectId,
            ref: 'users',
        }
    ],
},
{
    timestamps: true
});

const Boards = mongoose.model('boards', boardSchema);
module.exports = Boards;