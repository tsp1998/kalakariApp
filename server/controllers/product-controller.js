const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getProducts = async (req, res, next) => {
  let productId;
  if (req.params.productId) productId = req.params.productId;
  try {
    const query = productId ? { _id: productId } : {};
    const products = await Product.find(query);
    if (products) {
      return res.json({ products });
    } else {
      next(new Error("No Products Found"));
    }
  } catch (error) {
    next(error);
  }
};

exports.postAddProduct = async (req, res, next) => {
  const { name, price, description, sizes, colors, imageUrls } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      sizes,
      colors,
      imageUrls,
    });

    const product = await newProduct.save();
    if (product) {
      return res.json({ product });
    } else {
      next(new Error("Product Not Added"));
    }
  } catch (error) {
    next(error);
  }
};

exports.postUpdateProduct = async (req, res, next) => {
  const {
    productId,
    name,
    price,
    description,
    sizes,
    colors,
    imageUrls,
  } = req.body;
  try {
    let product = await Product.findById(productId);
    if (product) {
      updatedProduct = {
        ...product,
        name,
        price,
        description,
        sizes,
        colors,
        imageUrls,
      };
      product = await updatedProduct.save();
      if (product) {
        return res.json({ product });
      } else {
        next(new Error("Product Not Updated"));
      }
    } else {
      next(new Error("Product Not Found For Updation"));
    }
  } catch (error) {
    next(error);
  }
};
