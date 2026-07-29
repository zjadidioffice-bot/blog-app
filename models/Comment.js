const { name } = require("ejs");
const { body } = require("express-validator");
const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true
        },
        body:{
            type:String,
            required:true,
            trim:true
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            required:true
        },
        parent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
            default:null
        },
        isApproved:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
);

module.exports=mongoose.model("Comment",commentSchema);