const Tweet = require('../models/Tweet');

module.exports = {
	async index(req, res) {
		const { page = 1 } = req.query;
		const tweets = await Tweet.paginate({}, {page, limit: 5, sort: {created_at: 'desc'}});

		return res.json(tweets);
	},

	async store(req, res) {
		const tweet = await Tweet.create(req.body);

		req.io.emit('tweet', tweet);

		return res.json(tweet);
	}
}