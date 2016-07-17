var mongoose = require('mongoose');

// TODO data association between comment nad user
commentSchema = mongoose.Schema({
  author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String,
    },
  content: String
});

module.exports = mongoose.model('Comment', commentSchema);
