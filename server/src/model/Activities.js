const mongoose = require('mongoose');
const activitySchema = mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
},
{
    timestamps: true
});

const Activities = mongoose.model('activities', activitySchema);
module.exports = Activities;