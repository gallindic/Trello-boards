const mongoose = require('mongoose');

const BoardItemSchema = mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	boardID: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true,
		max: 255
	},
});

module.exports = mongoose.model('BoardItem', BoardItemSchema);