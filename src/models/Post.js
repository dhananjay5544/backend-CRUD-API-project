const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
	type: String,
	required: true,
};
const defaultNumber = {
	type: Number,
	default: 0,
};

const postSchema = new Schema(
	{
		usename: requiredString,
		title: requiredString,
		body: String,
		image: String,
		tags: Array,
		comments: [
			{
				text: String,
				usename: String,
				commentPostedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
		likes: defaultNumber,
		shares: defaultNumber,
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
