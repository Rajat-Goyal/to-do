var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = Schema({
  title: {type: String, required: true},
  text: {type: String, required: true },
  done: { type: Boolean, default: false}
});

module.exports = mongoose.model('Todo', TodoSchema);
