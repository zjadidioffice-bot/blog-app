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

const showReplyForm=async(req,res)=>{
    try {
        const comment=await Comment.findById(req.params.id)
        .populate("post");

        if(!comment){
            return res.status(404).send("comment not found");
        }

        res.render("admin/comments/reply",{
            layout:"layouts/admin",
            comment
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};

const reply=async(req,res)=>{
    try {
        const parentComment=await Comment.findById(req.params.id);
        await Comment.create({
            name:"مدیرسایت",
            email:"admin@blog.com",
            body:req.body.body,
            post:parentComment.post,
            parent:parentComment._id,
            isApproved:true
        });
        res.redirect("/admin/comments");
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
}
module.exports={
    index,
    approve,
    remove,
    showReplyForm,
    reply
}