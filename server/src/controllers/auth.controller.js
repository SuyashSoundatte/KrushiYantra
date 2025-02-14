import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body; // Token from frontend

  if (!token) {
    throw new ApiError(400, "Google token is required");
  }

  // Verify the token with Google
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name, picture } = ticket.getPayload(); // Extract user info

  // Generate JWT for authentication
  const authToken = jwt.sign({ email, name, picture }, process.env.JWT_SEC, {
    expiresIn: "7d",
  });

  res.send(new ApiResponse(200, { email, name, picture, authToken }, "Google Login Success"));
});

export { googleLogin };
