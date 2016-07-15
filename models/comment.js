var mongoose = require('mongoose');

// TODO data association between comment nad user
commentSchema = mongoose.Schema({
  author: String,
  content: String
});

module.exports = mongoose.model('Comment', commentSchema);
