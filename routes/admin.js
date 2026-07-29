const express = require("express");
const router = express.Router();

const postController = require("../controllers/admin/postController");
const categoryController = require("../controllers/admin/categoryController");
const dashboardController=require("../controllers/admin/dashboardController");
const upload=require("../middlewares/upload");
const postValidation=require("../validations/postValidation");
const isAuthenticated=require("../middlewares/isAuth");
const commentController=require("../controllers/admin/commentController");

router.get("/",isAuthenticated, dashboardController.index);

router.get("/posts",isAuthenticated, postController.getAllPosts);

router.get("/posts/create",isAuthenticated, postController.showCreateForm);

router.post("/posts",isAuthenticated,upload.single("image")
,postValidation,postController.createPost);

router.get("/posts/:id",isAuthenticated, postController.getSinglePost);

router.get("/posts/:id/edit",isAuthenticated, postController.showEditForm);

router.post("/posts/:id/edit",isAuthenticated,upload.single("image")
, postController.updatePost);

router.post("/posts/:id/delete",isAuthenticated, postController.deletePost);

router.get("/categories", isAuthenticated,categoryController.index);

router.get("/categories/create",isAuthenticated, categoryController.showCreateForm);

router.post("/categories",isAuthenticated, categoryController.createCategory);

router.get("/categories/:id/edit",isAuthenticated, categoryController.showEditForm);

router.post("/categories/:id/edit",isAuthenticated, categoryController.editCategory);

router.post("/categories/:id/delete",isAuthenticated, categoryController.deleteCategory);

router.get("/comments",
    isAuthenticated,commentController.index);

router.post("/comments/:id/approve",
    isAuthenticated,
    commentController.approve
);

router.post("/comments/:id/delete",
    isAuthenticated,
    commentController.remove
);
module.exports = router;