const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TweetSchema = new mongoose.Schema({
	author: String,
	content: String,
	likes: {
		type: Number,
		default: 0
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

TweetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Tweet', TweetSchema);