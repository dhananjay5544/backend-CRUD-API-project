const mongoose = require("mongoose");

const { Schema } = mongoose;

const requiredString = {
	type: String,
	required: true,
};
const defaultNumber = {
	type: Number,
};

const productSchema = new Schema({
	name: requiredString,
	categories: Array,
	tags: Array,
	price: defaultNumber,
	quantity: defaultNumber,
	isActive: Boolean,
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
