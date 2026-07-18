const express=require("express");
const router=express.Router();
const isAuthenticated=require("../middlewares/isAuth");
const controller=require("../controllers/categoryController");
const postController=require("../controllers/postController");
console.log(controller.deleteCategory);
console.log(typeof controller.deleteCategory);
router.get("/categories",isAuthenticated,controller.index)
router.get("/categories/create",isAuthenticated,controller.showCreateForm);
router.post("/categories",isAuthenticated,controller.createCategory);
router.get("/categories/:id/edit",isAuthenticated,controller.showEditForm);
router.post("/categories/:id",isAuthenticated,controller.editCategory);
router.post("/categories/:id/delete",isAuthenticated,controller.deleteCategory);

//show posts of category
router.get("/categories/:id/posts",postController.getPostByCategory);
module.exports=router;