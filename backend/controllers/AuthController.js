const User = require("../models/UserModel");
const { getUserToken } = require("../services/authServices");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

JWT_Secret = process.env.TOKEN_KEY;

module.exports.Signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, username, password, gender, createdAt, termsAgreed } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, gender ,username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    // res.redirect("http://localhost:3001/allOrders");
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });

    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
    res.status(201).json({
      message: "User logged in successfully",
      token: token,
      success: true,
      isLoggedin: true,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.getUserfromToken=async(req,res)=>{
  const token=req.headers.authorization?.split(' ')[1];
  console.log(token);
  if(!token){
    return res.status(401).json({success:false,message:"Token Not Provided"});
  }
  try {
    const response=await getUserToken(token);
    console.log(response);
    if (response.success) {
      return res.status(200).json(response);
    }
    else {
      return res.status(402).json(response);
    }
  } catch (error) {
    return {success:false,message:"failed to retrieve data."}
  }
}