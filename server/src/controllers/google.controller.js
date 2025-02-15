import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import oauth2Client from "../config/googleConfig.js";
import axios from "axios";
import { pool } from "../utils/db.js";

const getUserInfoFromGoogle = async (accessToken) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new ApiError(401, "Failed to fetch user info from Google");
  }
};

const findOrCreateUser = async (email, name) => {
  const userExistsQuery = 'SELECT * FROM users WHERE email = $1';
  const userExists = await pool.query(userExistsQuery, [email]);

  if (userExists.rows.length > 0) {
    return userExists.rows[0];
  }

  const insertQuery = `
    INSERT INTO users (
      username, email, phone, address, location, pass, is_active
    ) VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;
  
  const insertValues = [
    name,
    email,
    '9876543210',
    '123, MG Road, Mumbai, Maharashtra',
    'Mumbai, Maharashtra',
    'GOOGLE_AUTH',
    true
  ];
  
  const newUser = await pool.query(insertQuery, insertValues);
  return newUser.rows[0];
};

const generateAuthToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email 
    },
    process.env.JWT_SEC ,
    { expiresIn: "24h" }
  );
};

const googleLogin = asyncHandler(async (req, res) => {
  const { code } = req.query;
  if (!code) {
    throw new ApiError(400, "Authorization code is required");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.access_token) {
      throw new ApiError(401, "Failed to obtain access token");
    }

    const googleUser = await getUserInfoFromGoogle(tokens.access_token);
    // console.log(googleUser)
    const { email, name } = googleUser;

    const user = await findOrCreateUser(email, name);

    const authToken = generateAuthToken(user);
    
    res.send(new ApiResponse(200, {user, authToken}, "Login successful"));

  } catch (error) {
    throw new ApiError(
      error.statusCode,
      error.message || "Google Login failed. Please try again.",
      error.errors || [error.message]
    );
  }
});

export { googleLogin };