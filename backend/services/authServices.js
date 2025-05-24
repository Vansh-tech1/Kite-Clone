const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");// Ensure you import User model properly
require("dotenv").config();

JWT_Secret = process.env.TOKEN_KEY;

module.exports.getUserToken = async (token) => {
  try {
    const trimmedToken = token.trim();

    // Decode token
    const decodedToken = jwt.verify(trimmedToken, JWT_Secret);
    const id = decodedToken.id;

    // Use `_id` if you're using MongoDB (default for Mongoose)
    const user = await User.findOne({ _id: id });
    console.log(user);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, data: user };

  } catch (err) {
    return { success: false, message: "Invalid token", error: err.message };
  }
};
