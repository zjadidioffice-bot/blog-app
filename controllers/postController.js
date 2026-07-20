const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const Category = require("../models/Category")
const { validationResult, body } = require("express-validator");
const getAllPosts = async (req, res) => {
    try {
        const limit = 2;
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        let filter = {}

        if (search) {
            filter = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { body: { $regex: search, $options: "i" } }
                ]
            };
        }

        const totalPosts = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find(filter).
            populate("category")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.render("admin/posts/index", { posts, search, page, totalPages });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }

    // try {
    //     const limit=3;
    //     const page=Number(req.query.page)||1;
    //     const skip=(page-1)*limit
    //     const totalPosts=await Post.countDocuments();

    //     const {search}=req.query;
    //     let posts;
    //     if(search){
    //         posts=await Post.find({
    //             $or:[
    //                 {title:{$regex:search,$options:"i"}},
    //                 {body:{$regex:search,$options:"i"}}
    //             ]
    //         }).populate("category")
    //         .sort({createdAt:-1})
    //         .skip(skip)
    //         .limit(limit);
    //                 res.render("index", { posts,search });

    //     }
    //     else{
    //    const posts=await Post.find().populate("category")
    //    .sort({createdAt:-1})
    //    .skip(skip)
    //    .limit(limit);
    //     //const posts = await Post.find().sort({ createdAt: -1 });
    //     res.render("index", { posts,search });
    //     }

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("server error");
    // }
}

const showCreateForm = async (req, res) => {
    const categories = await Category.find();
    res.render("admin/posts/create", {
        oldData: {},
        errors: [],
        categories
    });
}

const createPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.render("create",
                {
                    errors: errors.array(),
                    oldData: req.body
                });
        }
        const { title, body, category } = req.body;
        const image = req.file ? req.file.filename : null;
        await Post.create({ title, body, category, image });
        res.redirect("/admin/posts");
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("category");
        if (!post) {
            return res.status(400).send("post not found");
        }
        res.render("admin/posts/single", { post });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

const showEditForm = async (req, res) => {
    try {
        const categories = await Category.find();
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).send("post not found");
        }
        res.render("admin/posts/edit", { post, categories });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
}
const updatePost = async (req, res) => {
    try {
        const { title, body, category } = req.body;

        const post = await Post.findById(req.params.id);
        post.title = title;
        post.body = body;
        post.category = category;

        if (req.file) {

            if (post.image) {

                const imagePath = path.join(
                    __dirname,
                    "../public/uploads",
                    post.image
                );

                fs.unlink(imagePath, (err) => {

                    if (err) {
                        console.log(err);
                    }

                });

            }

            post.image = req.file.filename;

        }
        await post.save();
res.redirect(`/admin/posts/${req.params.id}`);    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);


        if (post.image) {

            const imagePath = path.join(
                __dirname,
                "../public/uploads",
                post.image
            );

            fs.unlink(imagePath, (err) => {

                if (err) {
                    console.log(err);
                }

            });

        }

        await post.deleteOne();
res.redirect("/admin/posts");
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}

const getPostByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const posts = await Post.find({
            category: categoryId
        }).populate("category");
        res.render("admin/posts/index", { posts });
    } catch (error) {
        console.log(error)
        res.status(500).send("server error")
    }
}
module.exports = {
    getAllPosts,
    showCreateForm,
    createPost,
    getSinglePost,
    showEditForm,
    updatePost,
    deletePost,
    getPostByCategory
}