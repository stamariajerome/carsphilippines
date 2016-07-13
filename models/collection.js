var mongoose = require('mongoose');

var collectionSchema = mongoose.Schema({
  image: String,
  title: String,
  author: String,
  description: String,
  date: { type: String, default: Date.now },
  // TODO just added association
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
]
});

module.exports = mongoose.model('Collection', collectionSchema);
