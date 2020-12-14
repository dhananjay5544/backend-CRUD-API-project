const { Router } = require("express");
const Property = require("../models/Property");

const router = Router();

// list all properties
router.get("/", async (req, res, next) => {
  try {
    const PropertyData = await Property.find();
    const PropertyCount = await Property.countDocuments();
    res.json({ PropertyCount, data: PropertyData });
  } catch (error) {
    next(error);
  }
});

// add new property
router.Property("/", async (req, res, next) => {
  try {
    const PropertyData = new Property(req.body);
    const createdProperty = await PropertyData.save();
    res.json({
      message: "✅ Property created",
      data: createdProperty,
    });
  } catch (error) {
    next(error);
  }
});

// TODO: update property

// TODO: delete property

module.exports = router;
