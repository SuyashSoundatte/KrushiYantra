import { Router } from 'express';
import verifyToken from '../middlewares/Verify.middleware.js'; 
import { getAllBlogs, getBlogsById, createPost, updatePost, deletePost } from "../controllers/blog.controller.js";
import { validatePost, validatePostForUpdate } from "../middlewares/blogs.middleware.js";

const router = Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogsById);
router.post('/blogs',verifyToken, validatePost, createPost);
router.put('/blogs/:id',verifyToken, validatePostForUpdate, updatePost);
router.delete('/blogs/:id',verifyToken, deletePost);

export default router;