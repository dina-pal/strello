const mongoose = require('mongoose');
const cardSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, 'title is required']
    },
    description: {
      type: String
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
    listId: {
      type: Schema.Types.ObjectId,
      ref: 'lists'
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'boards'
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
},
{
    timestamps: true
});

const Cards = mongoose.model('cards', cardSchema);
module.exports = Cards;