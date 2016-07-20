var mongoose = require('mongoose');

var collectionSchema = mongoose.Schema({
  image: String,
  title: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
  },
  description: String,
  date: { type: Date, default: Date.now },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Collection', collectionSchema);
