import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { pool } from "../utils/db.js";
import jwt from "jsonwebtoken";

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogsQuery = `select title, imageUrl, content from Blog`;
  const blogs = await pool.query(blogsQuery);
  res.send(new ApiResponse(200, blogs.rows, "Blogs fetched successfully"));
});

const getBlogsById = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) {
    throw new ApiError(400, "Blog id is required");
  }

  const blogExists = await pool.query("SELECT * FROM Blog WHERE id = $1", [
    blogId,
  ]);

  if (blogExists.rows.length === 0) {
    throw new ApiError(400, "Blog not found");
  }

  const blogsQuery = `select title, imageUrl, content from Blog where id = $1`;
  const blogValue = [blogId];
  const blog = await pool.query(blogsQuery, blogValue);

  if (blogExists.rows.length === 0) {
    throw new ApiError(400, "Blog not found");
  }

  res.send(new ApiResponse(200, blog.rows[0], "Blog fetched successfully"));
});

const createPost = asyncHandler(async (req, res) => {
  const { title, imageUrl, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }
  try {
    const userId = req.user.id;
    if(!userId){
      throw new ApiError(400, "User id is required, check token once again");
    }

    await pool.query("BEGIN");

    const userExist = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (userExist.rows.length === 0) {
      throw new ApiError(400, "User not found");
    }

    const createPostQuery = `insert into Blog(title, imageUrl, content, authorId) values($1, $2, $3, $4)`;
    const createPostValues = [title, imageUrl, content, userId];
    await pool.query(createPostQuery, createPostValues);
    
    res.send(new ApiResponse(200, "Blog created successfully"));
  } catch (err) {
    await pool.query("ROLLBACK");
    throw new ApiError(500, "Error creating blogs");
  }
});


const updatePost = asyncHandler(async(req, res)=>{
  const { title, imageUrl, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }
  try {
    const blogId = req.params.id;
    if(!blogId){
      throw new ApiError(400, "Blog id is required, check token once again");
    }

    await pool.query("BEGIN");

    const blogExist = await pool.query("SELECT * FROM Blog WHERE id = $1", [
      blogId,
    ]);

    if (blogExist.rows.length === 0) {
      throw new ApiError(400, "Blog not found");
    }

    const updatePostQuery = `update Blog set title = $1, imageUrl = $2, content = $3 where id = $4`;
    const updatePostValues = [title, imageUrl, content, blogId];
    await pool.query(updatePostQuery, updatePostValues); 
    
    res.send(new ApiResponse(200, "Blog created successfully"));
  } catch (err) {
    await pool.query("ROLLBACK");
    throw new ApiError(500, "Error updating blogs"); 
  }
})

const deletePost = asyncHandler(async(req, res)=>{
  try {
    const blogId = req.params.id;
    if(!blogId){
      throw new ApiError(400, "Blog id is required, check token once again");
    }

    await pool.query("BEGIN");

    const blogExist = await pool.query("SELECT * FROM Blog WHERE id = $1", [
      blogId,
    ]);

    if (blogExist.rows.length === 0) {
      throw new ApiError(400, "Blog not found");
    }

    const updatePostQuery = `delete from Blog where id = $1`;
    const updatePostValues = [blogId];
    await pool.query(updatePostQuery, updatePostValues); 
    
    res.send(new ApiResponse(200, "Blog created successfully"));
  } catch (err) {
    await pool.query("ROLLBACK");
    throw new ApiError(500, "Error updating blogs"); 
  }
})



export { getAllBlogs, getBlogsById, createPost, deletePost, updatePost };
