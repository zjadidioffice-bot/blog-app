const express=require("express");
const router=express.Router();

const commentController=require("../controllers/site/commentController");

router.post("/blog/:id/comments",commentController.store);

module.exports=router;