var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TodoSchema = Schema({
  title: {type: String, required: true},
  text: {type: String, required: true },
  done: {type: Boolean, default: false },
  type: { type: String, required:true, enum:['Login', 'Document', 'Number', 'Bank'], default:'Document'}
});

module.exports = mongoose.model('Todo', TodoSchema);
