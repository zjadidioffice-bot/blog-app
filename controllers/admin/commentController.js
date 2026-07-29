const Comment=require("../../models/Comment");

const index=async(req,res)=>{
    try {
        const comments=await Comment.find()
        .populate("post")
        .sort({createdAt:-1});

        res.render("admin/comments/index",{
            layout:"layouts/admin",
            comments
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};
const approve=async(req,res)=>{
    try {
        await Comment.findByIdAndUpdate(
            req.params.id,
            {
                isApproved:true
            }
        );
        res.redirect("/admin/comments")
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};

const remove=async(req,res)=>{
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.redirect("/admin/comments");
    } catch (error) {
        console.log(error);
        res.status(500).send("sever error")
    }
};

module.exports={
    index,
    approve,
    remove
}