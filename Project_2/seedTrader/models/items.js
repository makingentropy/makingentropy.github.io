const mongoose=require("mongoose");

const itemSchema= mongoose.Schema({
  link: String,
  count: String,
  body: String
})
const item= mongoose.model("item",itemSchema);

module.exports=item;
