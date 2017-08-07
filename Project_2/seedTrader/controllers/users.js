const express=require("express");
const router=express.Router();
const User=require("../models/users.js");
const item=require("../models/items.js");

router.get("/",(req,res)=>{  //index of users
  User.find({},(err,foundUsers)=>{
    res.render('users/index.ejs', {
			users: foundUsers
		});
  });
});

router.post('/', (req, res)=>{
	User.create(req.body, (err, createdUser)=>{ //creates user
		res.redirect('/users');
	});
});

router.get('/new', (req, res)=>{ //user creation page
	res.render('users/new.ejs');
});

router.delete('/:id', (req, res)=>{
	User.findByIdAndRemove(req.params.id, (err,foundUser)=>{
				res.redirect('/users');
	});
});

router.get('/:id/edit', (req, res)=>{  //go to edit page of user
	User.findById(req.params.id, (err, foundUser)=>{
		res.render('users/edit.ejs', {
			user: foundUser
		});
	});
});
router.put('/:id', (req, res)=>{
	User.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/users');
	});
});

router.get('/:id', (req, res)=>{
	User.findById(req.params.id, (err, foundUser)=>{
		res.render('users/show.ejs', {
			user: foundUser
		});
	});
});

module.exports=router;
