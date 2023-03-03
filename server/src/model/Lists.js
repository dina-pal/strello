const mongoose = require('mongoose');
const listSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
},
{
    timestamps: true
});

const Lists = mongoose.model('lists', listSchema);
module.exports = Lists;