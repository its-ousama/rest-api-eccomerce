const express = require("express");
const router = express.Router();

// Define routes for users
router.get("/", (req, res) => {
  res.send("Users page");
});


router.post("/", (req, res) => {
  res.send("User data received");
});


module.exports = router;
