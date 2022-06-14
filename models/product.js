const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'product name must be provided'],
	},

	prince: {
		type: Number,
		required: [true, 'product price must be provided'],
	},

	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},

	company: {
		type: String,
		enum: {
			value: ['ikea', 'liddy', 'caressa', 'marcos'],
			message: '{VALUE} isnot supported',
		},
	},
});

module.exports = mongoose.model('Product', productSchema);
