const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const middlewares = require("./middlewares");

const app = express();

// importing routes
const users = require("./api/users");

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => console.log("Mongo connected.....✨"))
  .catch((err) => console.log(err.message));

app.get("/", (req, res) => {
  res.json({
    message: "✨📦✨📦✨📦✨--------Welcome to the API--------✨📦✨📦✨📦✨",
    requestedAt: new Date(),
  });
});

app.use("/api/users", users);

//custom error handlers
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
