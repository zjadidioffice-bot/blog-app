const index=(req,res)=>{
    res.render("admin/dashboard",{
        layout:"layouts/admin"
    });
};
module.exports={
    index,
};