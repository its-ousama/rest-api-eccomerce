const express = require("express");
const router = express.Router();
const {hashPassword} =require("../middleware/passencrypt")
const { userLogIn, userSignUp } = require("../controllers/userControllers")
const {verifyToken} =require("../middleware/auth")
const upload =require("../middleware/multerConfig")
const sharpMiddleware =require("../middleware/sharpMiddleware")

router.post("/signup",hashPassword,userSignUp)

router.post("/login",userLogIn)

router.post("/test",verifyToken,(req,res)=>{
  res.send("test")
}
)


router.put("/userUpdate", verifyToken, upload.single("image"), sharpMiddleware(), (req, res) => {

  if (!req.file) {
   return res.status(400).json({ error: "Error uploading the file. Wrong format ?" })
  }
  console.log(req.body)
  console.log(req.file) 
  console.log(req.userId) 
  const fileUrl =
   req.protocol + "://" + req.get("host") + "/" + req.file.processedPath
  res.json({ message: "User response reached", fileUrl })
})


module.exports = router;
