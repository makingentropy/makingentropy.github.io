const mongoose=require("mongoose");
const item=require("./items.js");

const userSchema= mongoose.Schema({
  name: String,
  items:[item.schema]
})
const User= mongoose.model("User",userSchema);

module.exports=User;
