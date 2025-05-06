const Product = require("../models/productModels");

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
      if (!req.file || !req.file.processedPath) {
        return res.status(400).json({ message: "Image upload or processing failed." });
      }
  
      const imageUrl = `https://rest-api-eccomerce-backend.onrender.com/${req.file.processedPath}`;
  
      const newProduct = new Product({
        productName,
        productDescription,
        brand,
        imageUrl, 
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
