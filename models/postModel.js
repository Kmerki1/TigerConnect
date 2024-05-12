const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', index: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    isReply: { type: Boolean, default: false },
},{ timestamps: true });

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
