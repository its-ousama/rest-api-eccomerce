const express = require("express");
const router = express.Router();
const { getProduct, addProduct } = require("../controllers/productControllers");
const { verifyAdmin } = require("../middleware/auth");
const upload = require("../middleware/multerConfig");
const sharpMiddleware = require("../middleware/sharpMiddleware");

router.get('/', getProduct);

router.post(
  '/addProduct',
  verifyAdmin,
  upload.single("image"),
  sharpMiddleware(),
  (req, res, next) => {
    if (req.file && req.file.processedPath) {
      req.body.imageUrl = `https://rest-api-eccomerce-backend.onrender.com/${req.file.processedPath}`;
    }
    next();
  },
  addProduct
);

module.exports = router;
