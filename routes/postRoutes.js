const express=require("express");
const router=express.Router();
const upload=require("../middlewares/upload");
const isAuthenticated=require("../middlewares/isAuth");
const controller=require("../controllers/postController");
const validator=require("../validations/postValidation");
const postValidation = require("../validations/postValidation");
router.get("/",isAuthenticated,controller.getAllPosts);
router.get("/posts/create",isAuthenticated,controller.showCreateForm);
router.post("/posts",isAuthenticated,upload.single("image"),postValidation,controller.createPost);
router.get("/posts/:id",controller.getSinglePost);
router.get("/posts/:id/edit",isAuthenticated,controller.showEditForm);
router.post("/posts/:id/edit",isAuthenticated,upload.single("image"),controller.updatePost);
router.post("/posts/:id/delete",isAuthenticated,controller.deletePost)

module.exports=router;