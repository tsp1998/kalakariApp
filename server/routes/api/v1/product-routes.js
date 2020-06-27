const express = require("express");
const router = express.Router();
const {
  getProducts,
  postAddProduct,
  postUpdateProduct,
} = require("../../../controllers/product-controller");

router.get("/", getProducts);
router.get("/:productId", getProducts);
router.post("/add", postAddProduct);
router.post("/update", postUpdateProduct);

module.exports = router;
