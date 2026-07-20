const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const categoryController = require("../controllers/categoryController");

router.get("/", (req, res) => {
    res.render("admin/dashboard");
});

router.get("/posts", postController.getAllPosts);

router.get("/categories", categoryController.index);

module.exports = router;