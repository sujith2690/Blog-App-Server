import mongoose from "mongoose";
import blogModel from "../model/blog.js";
import userModel from "../model/user.js";

export const getAllBlogs = async (req, res, next) => {

    try {
        console.log('blog get here')
        let blogs = await blogModel.find().populate('userId','-password');
        console.log(blogs, '------blogs')
        if (blogs) {
            return res.status(200).json({ blogs, success: true, message: "All Blogs Found" })
        } else {
            return res.status(404).json({ success: true, message: "No Blogs Found" })
        }
    } catch (error) {
        console.log(error)
    }
}
export const addBlog = async (req, res, next) => {
    try {
        const { userId, title, description, image, category } = req.body
        const existingUser = await userModel.findById(userId)
        if (!existingUser) {
            return res.status(400).json({ message: "Unable to Find User by this ID" })
        }
        const blog = new blogModel({ userId, title, description, image, category })

        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })
        existingUser.blogs.push(blog)
        await existingUser.save({ session })
        await session.commitTransaction()

        return res.status(200).json({ blog, message: 'Blog Created' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}
export const updateBlog = async (req, res, next) => {
    try {
        const { title, description, image } = req.body
        const blogId = req.params.id
        console.log(blogId, 'blogId')
        const blog = await blogModel.findByIdAndUpdate(blogId, { title, description, image })
        if (!blog) {
            return res.status(500).json({ message: "Unable to Update the Blog", success: false })
        }
        return res.status(200).json({ blog, message: "Blog is Updated", success: true })
    } catch (error) {
        console.log(error)
    }
}
export const getBlogById = async (req, res, next) => {
    try {
        const blogId = req.params.id
        console.log(blogId, '----blog ID')
        const blog = await blogModel.findById(blogId)
        console.log(blog, '------blog')
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found", success: false })
        }
        return res.status(200).json({ message: "Blog Found", blog, success: true })
    } catch (error) {
        console.log(error)
    }
}
export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const blog = await blogModel.findByIdAndRemove(blogId).populate('userId')
        if (!blog) {
            return res.status(400).json({ message: "Unable to Delete", success: false })
        }
        await blog.userId.blogs.pull(blog)
        await blog.userId.save()
        res.status(200).json({ blog, message: 'Blog Deleted' })
    } catch (error) {
        console.log(error, '----error')
    }
}
export const userBlogs = async (req, res, next) => {
    try {
        const userId = req.params.id
        console.log(userId,'-----------blogssssssssssssssss')
        const userBlogs = await userModel.findById(userId).populate('blogs')
        const { password, createdAt, updatedAt, __v, ...others } = userBlogs._doc
        if (!userBlogs) {
            return res.status(404).json({ message: 'No Blog Found' })
        }
        console.log(others,'----------------')
        return res.status(200).json({ success: true, userBlogs: others })
    } catch (error) {
        console.log(error)
    }

}