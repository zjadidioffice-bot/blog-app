const Category = require("../models/Category");

const index=async(req,res)=>{
    const categories=await Category.find();
    res.render("admin/categories/index",{
        categories
    });
};
const showCreateForm=(req,res)=>{
    res.render("categories/create");
}

const createCategory=async(req,res)=>{
const {name}=req.body;
await Category.create({
    name
});
res.redirect("admin/categories");
}

const showEditForm=async(req,res)=>{
const category=await Category.findById(req.params.id);
res.render("admin/categories/edit",{category});
};

const editCategory=async(req,res)=>{
const{name}=req.body;
await Category.findByIdAndUpdate(
    req.params.id,
    {name}
);
res.redirect("/categories")
}

const deleteCategory=async(req,res)=>{
    await Category.findByIdAndDelete(req.params.id)
    res.redirect("/categories")
}
module.exports={
    index,
    showCreateForm,
    createCategory,
    showEditForm,
    editCategory,
    deleteCategory
}