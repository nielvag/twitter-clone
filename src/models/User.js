const mongoose = require('../db_config');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		unique: true,
		require: true,
		lowercase: true
	},
	password: {
		type: String,
		require: true,
		select: false
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.password, 10);
	this.password = hash;

	next();
});


module.exports = mongoose.model('User', UserSchema);