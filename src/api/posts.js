const { Router } = require("express");
const Post = require("../models/Post");

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const postData = await Post.find();
		const postCount = await Post.countDocuments();
		res.json({ postCount, data: postData });
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const postData = new Post(req.body);
		const createdPost = await postData.save();
		res.json({
			message: "✅ Post created",
			data: createdPost,
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { deletedCount } = await Post.deleteOne({ _id: req.params.id });
		if (deletedCount != 0) {
			res.json({
				message: "✅ Post deleted",
			});
		} else {
			res.status(404);
			res.json({
				message: `❌ Post Not Found with id ${req.params.id}`,
			});
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
