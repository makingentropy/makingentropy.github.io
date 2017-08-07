const express=require('express');
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

const usersController=require("./controllers/users.js");
app.use("/users",usersController);
const itemsController=require("./controllers/items.js");
app.use("/items",itemsController);

app.get("/",(req,res)=>{
  res.render("index.ejs");
})

const mongoUri=process.env.MONGODB_URI || "mongodb://localhost:27017/project2"
mongoose.connect(mongoUri);

mongoose.connect("mongodb://localhost:27017/project2");
mongoose.connection.once("open",()=>{
  console.log("connected to mongo");
})

const port=process.env.PORT || 3000;

app.listen(3000,()=>{
  console.log("listening on 3000");
})
