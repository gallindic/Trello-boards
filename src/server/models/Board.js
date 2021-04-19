const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true,
		max: 255
	},
});

module.exports = mongoose.model('Board', BoardSchema);