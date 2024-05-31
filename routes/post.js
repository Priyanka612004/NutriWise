const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
  },
  // username:String,
  name:String,
  phone:String,
  email:String,
  company:String,
  subject:String,
  question:String,
  date:{
    type:Date,
    default:Date.now
  },
});

module.exports=mongoose.model("post",postSchema);