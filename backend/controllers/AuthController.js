const User = require("../models/UserModel");
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
    const user = await User.create({
      email,
      password,
      username,
      gender,
      createdAt,
      termsAgreed,
    });
    const token = createSecretToken({
      username: username,
      email: email,
      gender: gender,
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
    const token = createSecretToken({
      username: user.username,
      email: user.email,
      gender: user.gender,
    });
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

module.exports.getUserfromToken = async (token) => {
  try {
    console.log(token.Authorization);
    const decodedToken = await jwt.verify(token, JWT_Secret);

    console.log(decodedToken);
  } catch (err) {
    console.log(err);
  }
};
