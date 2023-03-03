const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
    userId: {
        type: SchemaType.Types.ObjectId,
        ref: 'users',
    },
    listId:{
        typeof: Schema.Types.ObjectId,
        ref: 'lists',
    },
    title: {
        typeof: 'string',
        required: [true, 'Title is required'],
    },
    description: {
        typeof: 'string',
    }
},
{
    timestamps: true
});

const Comments = mongoose.model('comments', commentSchema);
module.exports = Comments;