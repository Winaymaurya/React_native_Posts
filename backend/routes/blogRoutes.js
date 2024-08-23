import express  from "express";
import { createBlogController, deleteBlogController, getAllBlogController, getSingleBlogController, getUserBlogsController, updateBlogController } from "../controllers/blogController.js";

const router=express.Router();

// Routes

router.post('/create',createBlogController)

router.get('/all-blogs',getAllBlogController)

router.get('/get-blog/:id',getSingleBlogController)

router.delete('/delete/:id',deleteBlogController)

router.put('/update/:id',updateBlogController)

// get user blog
 
router.get('/user-blog/:id',getUserBlogsController)

export default router;