import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	groupBelonged: {
		type: String,
		required: true
	},
	postedBy: {
		type: String,
		required: true
	},
	datePosted: {
	   type: String,
       required: true
    },
    hashtags: {
		type: Array,
		required: true
	},
	reactions: {
		type: Array,
		required: true
	},
	files: Array,
	technologyHandle: String,
	question: String,
	description: String,
	adTitle: String,
	details: String,
	post: String,
	newsTitle: String,
	authors: Array,
	newsBody: String,
	price: Number,
	mediaTitle: String,
	mediaType: String,
	url: String

});

export default mongoose.model('Post', PostSchema);