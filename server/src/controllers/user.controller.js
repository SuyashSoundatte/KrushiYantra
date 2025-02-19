import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";
import { hashPassword, verifyPassword } from "../utils/hashPass.js";

const registerUser = asyncHandler(async(req, res) => {
  const { username, email, password, phone, role } = req.body;

  if (!username || !email || !password || !phone || !role) {
    throw new ApiError(400, "Username, email, password, phone are required");
  }
  
  try {
    await pool.query('BEGIN');

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
      throw new ApiError(400, "Email already exists");
    }

    const roleId = await pool.query("SELECT id FROM roles WHERE role = $1", [role]);

    if (roleId.rows.length === 0) {
      throw new ApiError(400, "Invalid role");
    }

    const hashPass = await hashPassword(password);

    const user = await pool.query(
      "INSERT INTO users (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING u_id",
      [username, email, hashPass, phone]
    );

    const roleAssigned = `INSERT INTO user_roles(u_id, r_id) VALUES($1, $2)`;
    const roleAssignedValues = [user.rows[0].u_id, roleId.rows[0].r_id];
    await pool.query(roleAssigned, roleAssignedValues);

    await pool.query('COMMIT');

    res.send(new ApiResponse(200, user, "User registered successfully"));

  } catch (err) {
    await pool.query('ROLLBACK');
    throw new ApiError(500, "Error registering user");
  }
});


const loginUser = asyncHandler(async(req, res)=>{
  const { email, password } = req.body;

  if(!email || !password){
    throw new ApiError(400, "Email and password are required");
  }

  const userNotFound = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if(userNotFound.rows.length === 0){
    throw new ApiError(400, "User not found");
  }

  const verifyPass = await verifyPassword(userNotFound.rows[0].password, password);

  if(!verifyPass){
    throw new ApiError(400, "Invalid password");
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  const userRoleQuery = `
    select r.role from roles r
    left join user_roles ur on r.r_id = ur.r_id
    left join users u on ur.u_id = u.u_id
    where u.email = $1
  `  
  const userRoleValues = [email]
  const userRole = await pool.query(userRoleQuery, userRoleValues);

  const token = jwt.sign(
    {email: user.rows[0].email, role: userRole.rows[0].role},
    process.env.JWT_SEC,
    { expiresIn: "7d" }
  );

  res.cookie("cookie", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  res.send(new ApiResponse(200, {email: user.rows[0].email, role: userRole.rows[0].role, token}, "User logged in successfully"));
});

const logOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return res.send(new ApiResponse(200, "User logged out successfully"));
});

const getUser = asyncHandler(async(req, res)=>{
  const userEmail = req.user.email;

  if(!userEmail){
    throw new ApiError(400, "Email is required not found");
  }

  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);

  if(userExists.rows.length === 0){
    throw new ApiError(400, "User not found");
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
  res.send(new ApiResponse(200, user.rows[0], "User fetched successfully"));
})

const getUserById = asyncHandler(async(req, res)=>{
  const userEmail = req.params.email; 
  if(!userEmail){
    throw new ApiError(400, "User id is required");
  }

  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);

  if(userExists.rows.length === 0){
    throw new ApiError(400, "User not found");
  }

  res.send(new ApiResponse(200, userExists.rows[0], "User fetched successfully"));
})

const getAllUserOnline = asyncHandler(async(req, res)=>{
  const query = `select * from users where online = true`;
  const users = await pool.query(query);
  res.send(new ApiResponse(200, users.rows, "Users online"));
})

export {
  registerUser,
  loginUser,
  logOutUser,
  getUser, 
  getUserById,
  getAllUserOnline
}