const Post = require("../models/Post");
const Category = require("../models/Category");
const home = async (req, res) => {
    try {
        const latestPosts = await Post.find()
            .populate("category")
            .sort({ createdAt: -1 })
            .limit(6);
        const categories = await Category.find();
        res.render("site/home", {
            layout: "layouts/site",
            latestPosts,
            categories
        });
    } catch (error) {
        console.log(error);

        res.status(500).send("Server Error");
    }

};

module.exports = {
    home
};