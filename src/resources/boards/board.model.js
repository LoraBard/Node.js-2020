const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

columnSchema.statics.toResponse = column => {
  const { _id, title, order } = column;
  return { _id, title, order };
};

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: [columnSchema]
});

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
