const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
},{ timestamps: true });

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
