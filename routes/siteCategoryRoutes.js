const express=require("express");
const router=express.Router();

const controller=require("../controllers/site/categoryController")

router.get("/categories",controller.index);
router.get("/categories/:id",controller.show);

module.exports=router;