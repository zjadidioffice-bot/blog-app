const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:null
    }
    ,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
},
{
    timestamps:true,
});

module.exports=mongoose.model("Post",postSchema);