const Product = require("../models/productModels");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  const { productName, productDescription, brand, model, stock, price } = req.body;

  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed." });
    }

    // ⬆️ Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });

    // ✅ Clean up uploaded local file (optional)
    fs.unlinkSync(req.file.path);

    const newProduct = new Product({
      productName,
      productDescription,
      brand,
      imageUrl: result.secure_url,
      model,
      stock,
      price,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
