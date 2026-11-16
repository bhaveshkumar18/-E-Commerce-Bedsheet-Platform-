import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Product } from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Classic T-Shirt",
    description: "High-quality cotton t-shirt perfect for everyday wear.",
    price: 19.99,
    category: "Clothing",
    stock: 100,
    imageUrl: "/uploads/sample-shirt.jpg"
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes with excellent support.",
    price: 59.99,
    category: "Footwear",
    stock: 50,
    imageUrl: "/uploads/sample-shoes.jpg"
  },
  {
    name: "Wireless Headphones",
    description: "Premium noise cancelling wireless headphones.",
    price: 99.99,
    category: "Electronics",
    stock: 30,
    imageUrl: "/uploads/sample-headphones.jpg"
  },
  {
    name: "Laptop Backpack",
    description: "Durable laptop backpack with multiple compartments.",
    price: 3.99,
    category: "Accessories",
    stock: 75,
    imageUrl: "/uploads/sample-backpack.jpg"
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with fitness tracking.",
    price: 149.99,
    category: "Electronics",
    stock: 25,
    imageUrl: "/uploads/sample-watch.jpg"
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Sample products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

importData();
