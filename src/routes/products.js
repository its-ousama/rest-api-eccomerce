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
    // Add image path to req.body before passing to controller
    if (req.file && req.file.processedPath) {
      req.body.imageUrl = req.protocol + "://" + req.get("host") + "/" + req.file.processedPath;
    }
    next();
  },
  addProduct
);

module.exports = router;
