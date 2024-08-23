import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

export const createBlogController = async (req, res) => {
    try {
        const { title, description, user } = req.body
        if (!title || !description || !user) {
            return res.status(400).send({
                success: false,
                message: "All Fields are required"
            })
        }
        const existingUser = await userModel.findById(user)

        if (!existingUser) {
            return res.status(200).send({
                success: false,
                message: "Can't Find user"
            })
        }

        const existingBlog =await blogModel.findOne({title})
        if(existingBlog){
           return res.status(200).send({
                success:false,
                message:"Blog title already in use"
            })
        }
        const blog = new blogModel({ title, description, user })
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })
        existingUser.blogs.push(blog)
        await existingUser.save({ session })
        await session.commitTransaction()

        await blog.save();
        return res.status(201).send({
            success: true,
            message: "New Blog Created",
            blog
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
export const updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: "Blog updated Successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
export const getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user')
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found"
            })
        }

        return res.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: "Blogs Shown",
            blogs
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
export const getSingleBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "No Blog Found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Single Blog fetched",
            blog
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
export const deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel
            .findByIdAndDelete(req.params.id)
            .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error While Deleting Blog",
            error,
        });
    }
}


// get user blog
export const getUserBlogsController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if (!userBlog) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found",

            })
        }
        return res.status(200).send({
            success: true,
            message: "user Blogs Shown",
            userBlog
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: "true",
            message: "Something went wrong",
            error
        })
    }
}