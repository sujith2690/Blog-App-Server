import express from 'express'
import { addBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog, userBlogs } from "../controller/blogController.js";

const blogRouter = express.Router()

blogRouter.get("/",getAllBlogs)
blogRouter.post("/add",addBlog)
blogRouter.put("/updateBlog/:id",updateBlog)
blogRouter.get("/:id",getBlogById)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/userBlogs/:id",userBlogs)


export default blogRouter;
