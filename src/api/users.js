const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { transporter } = require("../config/emailTransporter");
require("dotenv").config();

const router = Router();

// list all users
router.get("/", async (req, res, next) => {
  try {
    const UserData = await User.find();
    const UserCount = await User.countDocuments();
    res.json({ UserCount, data: UserData });
  } catch (error) {
    next(error);
  }
});

// login user
router.post("/auth", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const UserData = await User.find({ email, password });
    if (UserData.length != 0) {
      res.status(200).json({
        auth: true,
        emailConfirmed: UserData[0].emailConfirmed,
        token: "dummytoken:)",
      });
    } else {
      res.status(200).json({ auth: false, status: "unauthorised" });
    }
  } catch (error) {
    next(error);
  }
});

// check already registerd ?
router.get("/check/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const UserData = await User.find({ email });
    setTimeout(() => {
      res.status(200).json({
        alreadyRegistered: UserData.length != 0,
      });
    }, 2000);
  } catch (error) {
    next(error);
  }
});

// confirm email
router.get("/confirmation/:token", async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    const data = await User.findByIdAndUpdate(
      id,
      {
        emailConfirmed: true,
      },
      { useFindAndModify: false }
    );
    return res.redirect("http://localhost:3000");
  } catch (error) {
    next(error);
  }
});

// add new user
router.post("/", async (req, res, next) => {
  try {
    const UserData = new User(req.body);
    const createdUser = await UserData.save();

    //async mail
    jwt.sign(
      { id: createdUser._id },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
      (err, emailToken) => {
        const url = `http://localhost:5000/api/users/confirmation/${emailToken}`;
        transporter.sendMail({
          to: req.body.email,
          subject: "noreply@onestay - Confirm Email",
          html: `<h1>Hello ${UserData.firstName}</h1><h2>Please click this link to confirm your OneStay account</h2> <a href="${url}">${url}</a>`,
        });
      }
    );
    res.json({
      message: "✅ User registered",
      id: createdUser._id,
    });
  } catch (error) {
    next(error);
  }
});

// update user
router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        verified: req.body.status,
      },
      { useFindAndModify: false }
    );
    res.json({
      message: "✅ User status updated",
      id: updatedUser,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
