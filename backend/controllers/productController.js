import { Product } from "../models/Product.js";
import fs from "fs";

// @desc    Get all products with pagination and search
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.search
    ? {
        name: { $regex: req.query.search, $options: "i" }
      }
    : {};
  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  const filter = { ...keyword, ...categoryFilter };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    imageUrl: `/uploads/${req.file.filename}`
  });

  res.status(201).json(product);
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = name ?? product.name;
  product.description = description ?? product.description;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.stock = stock ?? product.stock;

  if (req.file) {
    // Delete old file if exists
    if (product.imageUrl && product.imageUrl.startsWith("/uploads/")) {
      const oldPath = `.${product.imageUrl}`;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    product.imageUrl = `/uploads/${req.file.filename}`;
  }

  const updated = await product.save();
  res.json(updated);
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Delete image file
  if (product.imageUrl && product.imageUrl.startsWith("/uploads/")) {
    const oldPath = `.${product.imageUrl}`;
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }
  await product.deleteOne();
  res.json({ message: "Product removed" });
};
