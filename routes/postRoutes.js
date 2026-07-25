const express=require("express");
const router=express.Router();
const upload=require("../middlewares/upload");
const isAuthenticated=require("../middlewares/isAuth");
const blogController=require("../controllers/site/blogController");
const validator=require("../validations/postValidation");
const postValidation = require("../validations/postValidation");
router.get("/blog",blogController.index);
router.get("/blog/:id",blogController.single);

module.exports=router;