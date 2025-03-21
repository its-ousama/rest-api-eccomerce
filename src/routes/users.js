const express = require("express");
const router = express.Router();
const {hashPassword} =require("../middleware/passencrypt")
const { userLogIn, userSignUp } = require("../controllers/userControllers")

// Define routes for users
router.get("/", (req, res) => {
  res.send("Users page");
});


router.post("/",hashPassword,userSignUp)



router.get("/", userLogIn)


module.exports = router;
