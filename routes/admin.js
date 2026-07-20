const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const categoryController = require("../controllers/categoryController");

router.get("/", (req, res) => {
    res.render("admin/dashboard");
});

router.get("/posts", postController.getAllPosts);

router.get("/posts/create", postController.showCreateForm);

router.post("/posts", postController.createPost);

router.get("/posts/:id", postController.getSinglePost);

router.get("/posts/:id/edit", postController.showEditForm);

router.post("/posts/:id/edit", postController.updatePost);

router.post("/posts/:id/delete", postController.deletePost);
router.get("/categories", categoryController.index);

router.get("/categories/create", categoryController.showCreateForm);

router.post("/categories", categoryController.createCategory);

router.get("/categories/:id/edit", categoryController.showEditForm);

router.post("/categories/:id/edit", categoryController.editCategory);

router.post("/categories/:id/delete", categoryController.deleteCategory);
module.exports = router;