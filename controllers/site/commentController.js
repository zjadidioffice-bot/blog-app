const Comment=require("../../models/Comment");

const store=async(req,res)=>{
    try {
        const {name,email,body}=req.body;
        await Comment.create({
            name,
            email,
            body,
            post:req.params.id,
            isApproved:true
        });

        res.redirect(`/blog/${req.params.id}`);
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
    }
};

module.exports={
    store
};