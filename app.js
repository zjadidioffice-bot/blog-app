require("dotenv").config();

const express=require("express");
const path=require("path");
const connectDB=require("./config/db");
const postRouter=require("./routes/postRoutes");
const userRouter=require("./routes/userRouter");
const categoryRouter=require("./routes/categoryRoutes")
const adminRoutes = require("./routes/admin");
const session = require("express-session");
const app=express();

connectDB();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}));
app.use("/admin", adminRoutes);
app.use(userRouter)
app.use(postRouter);
app.use(categoryRouter);


const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server runnig on port ${PORT}`);
});