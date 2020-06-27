const path = require("path");
const multer = require("multer");
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();
//configs
const { MONGOURI } = require("./config/keys");

//file upload multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now() + path.extname(file.originalname)}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//middlewares
app.use(express.json());
app.use(multer({ storage, fileFilter }).array("images", 3));

//routes
app.use("/api/products", require("./routes/api/v1/product-routes"));

//error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 404;
  const message = err.message;
  const data = err.data;
  const error = { message, data };
  console.error("Error: ", error);
  res.status(statusCode).json(error);
});

//start server
app.listen(PORT, async (err) => {
  if (err) return console.log(err);
  console.log(`App Started Listening on ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log("Waiting for Database Connection");
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
  }
});
