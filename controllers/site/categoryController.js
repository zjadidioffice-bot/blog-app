const { name } = require("ejs");
const Category=require("../../models/Category");
const Post=require("../../models/Post");
const index=async(req,res)=>{
    try {
        const categories=await Category.find().sort({name:1});
        res.render("site/categories",{
            layout:"layouts/site",
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }
};

const show=async(req,res)=>{
    try {
        const category=await Category.findById(req.params.id);
        if(!category)
        {
            return res.status(404).send("category not found")
        }
        const posts=await Post.find({
            category:req.params.id
        }).populate("category")
        .sort({createdAt:-1});
        console.log(posts);
        res.render("site/blog",{
            layout:"layouts/site",
            posts,
            category,
            page:1,
            totalPages:1,
            search:""
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};
module.exports={
    index,
    show
};