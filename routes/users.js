const mongoose=require("mongoose");
const plm =require("passport-local-mongoose");
mongoose.connect("mongodb+srv://NutriWise:nutriwise%403@cluster0.z4aqzci.mongodb.net/Nutriwise");

const userSchema=mongoose.Schema({
  username:String,
  email:String,
  password:String,
  posts:[{type:mongoose.Schema.Types.ObjectId, ref:"post"}],
});
userSchema.plugin(plm);

module.exports=mongoose.model("user",userSchema);