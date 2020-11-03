const { Router } = require("express");
const Product = require("../models/Product");

const router = Router();

// Get all the products
router.get("/", async (req, res, next) => {
	try {
		const productData = await Product.find();
		res.json({ data: productData });
	} catch (error) {
		next(error);
	}
});

// Insert a new product
router.post("/", async (req, res, next) => {
	try {
		const productData = new Product(req.body);
		const createdProduct = await productData.save();
		res.json({
			message: "✅ Product created",
			data: createdProduct,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
