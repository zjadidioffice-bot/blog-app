const Post=require("../../models/Post");
const Comment = require("../../models/Comment");
const index = async (req, res) => {
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

        res.render("site/blog", { posts, search, page, totalPages,
                layout: "layouts/site"
 });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}


const single = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("category");
        
        const comments=await Comment.find({
            post:post._id,
           // isApproved:true,
            parent:null
        })
        .sort({createdAt:-1});

        if (!post) {
            return res.status(404).send("post not found");
        }
        res.render("site/single", {
            layout:"layouts/site",
             post,
            comments });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}
module.exports={
    index,
    single
}