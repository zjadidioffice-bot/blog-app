const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

const User=require("../models/User");
mongoose.connect("mongodb://localhost:27017/blogDB");
async function createAdmin() {
 const hashedPassword=await bcrypt.hash("123456",10);
 await User.create({
    username:"admin",
    email:"admin@gmail.com",
    password:hashedPassword
 });
 console.log("admin created");
 mongoose.disconnect();   
}
createAdmin();