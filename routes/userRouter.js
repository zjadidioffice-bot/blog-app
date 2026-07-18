const express=require("express");
const userController=require("../controllers/userController")
const router=express.Router();
router.get("/login",userController.showLoginForm)
router.post("/login",userController.login)
router.get("/logout",userController.logout)
module.exports=router;