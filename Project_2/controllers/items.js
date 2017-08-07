const express = require('express');
const router = express.Router();
const item = require('../models/items.js');
const User= require("../models/users.js");

router.get('/', (req, res)=>{
	item.find({}, (err, foundItems)=>{
		res.render('items/index.ejs', {
			items: foundItems
		});
	})
});

router.get('/new', (req, res)=>{
	User.find({},(err,allUsers)=>{
		res.render('items/new.ejs',{
			users:allUsers
		});
	});
});

router.post('/', (req, res)=>{
	item.create(req.body,(err,createdItem)=>{
		User.findById(req.body.userId,(err,foundUser)=>{
      console.log(createdItem);
      console.log(foundUser);
			foundUser.items.push(createdItem); //this doesn't automatically save to database
			foundUser.save((err,data)=>{ //this saves to database
				res.redirect("/items");
			});
		});
	});
});

router.get('/:id', (req, res)=>{
		item.findById(req.params.id, (err, foundItem)=>{
			User.findOne({"items._id":req.params.id},(err,foundUser)=>{
        console.log("err: "+err);
        console.log(foundItem);
        console.log(foundUser);

				res.render('items/show.ejs', {
					item: foundItem,
					user: foundUser
			});
		});
	});
});

router.delete('/:id', (req, res)=>{
	item.findByIdAndRemove(req.params.id,()=>{
		User.findOne({"items._id":req.params.id},(err,foundUser)=>{
			foundUser.items.id(req.params.id).remove();
			foundUser.save((err,savedUser)=>{ //MUST save revised model back to database
				res.redirect('/items');
			});
		});
	});
});
router.get('/:id/edit', (req, res)=>{
	item.findById(req.params.id, (err, foundItem)=>{
		res.render('items/edit.ejs', {
			item: foundItem
		});
	});
});

router.put('/:id', (req, res)=>{
	item.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/items');
	});
});
module.exports = router;
