const User = require("../models/userModels")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const foundUser = await User.findOne({ email })
        if (!foundUser) {
            throw new Error("Invalid credentials")
        }
        const passwordMatch = await bcrypt.compare(password, foundUser.password)
        if (!passwordMatch) {
            throw new Error("Invalid credentials")
        }
        const token = jwt.sign(
            {
                userId: foundUser._id,
            },
            process.env.SECRET_TOKEN_KEY,
            { expiresIn: "24h"}
        )
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
              email: foundUser.email,
              firstName: foundUser.firstName,
              role: foundUser.role,
            },
          });
    }
    catch (err) {
        res.status(401).json({ 
            message: err.message,
        })
    }
};

exports.userSignUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = req.hashedPassword;
  
    try {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: "user",       
        inventory: [],      
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({ message: "User registered", user: savedUser });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Server error" });
    }
};
