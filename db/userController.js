// const express= require('express');

// let router = express.Router();

// router.get('/',(req,res)=>{
// res.json('sample')
// });

// module.exports=router;

const userModel = require("./user.model");
const mongoose = require("mongoose");
const User = mongoose.model("User");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
	res.send("test function");
};

let user = new User();

exports.user_create = function (req, res) {
	user.email = req.body.email;
	user.password = req.body.password;
	user.products = req.body.products;

	try {
		user.save(function (err) {
			if (err) {
				res.status(400).send("Invalid entry!");
			}
			res.status(200).send("Inserted!");
		});
	} catch (error) {
		console.log(error);
	}
};

exports.user_list = function (req, res) {
	User.find({}, function (err, user) {
		if (err) return req.send("401");
		res.status(200).send(user);
	});
};

exports.user_details = function (req, res) {
	User.find({ email: req.params.email }, function (err, user) {
		if (err) return req.send("401");
		res.send(user);
	});
};

exports.product_details = function (req, res) {
	User.find({ email: req.params.email }, { _id: 0, products: 1 }, function (
		err,
		products
	) {
		console.log(products);

		if (err || products.length == 0) {
			res.status(401);
			return res.send("401");
		}
		res.send(products);
	});
};

exports.product_add = function (req, res) {
	User.findOne({ email: req.params.email }, function (err, doc) {
		if (err) {
			console.log(err);
			res.status(400).send("Invalid request!");
		} else {
			console.log(req.body);
			doc.products.push(req.body.products[0]);
			doc.save();
			res.status(200).send(doc.products);
		}
	});

	// User.update(
	// 	{ email: req.params.email },
	// 	{
	// 		products: products.push.apply(products, req.body.products),
	// 	},
	// 	function (err, affected, resp) {
	// 		console.log(resp);
	// 	}
	// );
	// User.findOne({ email: req.params.email }, function (err, user) {
	// for (product in req.body.products) {
	// 	console.log("product " + req.body.products[product].name);
	// 	for (p in user._doc.products) {
	// 		// console.log("p " + user._doc.products[p]);
	// 		if (
	// 			req.body.products[product].name == user._doc.products[p].name &&
	// 			req.body.products[product].price == user._doc.products[p].price
	// 		) {
	// 			console.log("same name and price");
	// 		} else if (
	// 			req.body.products[product].name == user._doc.products[p].name
	// 		) {
	// 			console.log("same name");
	// 		} else if (
	// 			req.body.products[product].price == user._doc.products[p].price
	// 		) {
	// 			console.log("same price");
	// 		} else {
	// 			// console.log("totally new product");
	// 		}
	// 	}
	// }
	// if (newItems.length > 0) {
	// 	console.log("there is a new item!");
	// } else {
	// 	console.log("no new item");
	// }
	// console.log(user._doc.products.push(req.body.products[0]));
	// res.send(user._doc.products);
	//add to user product array
};

// console.log(req.body.products);

//
exports.updateProduct = function (req, res) {
	User.findOne({ email: req.params.email }, function (err, doc) {
		if (err) {
			console.log(err);
			res.status(400).send("Invalid request!");
		} else {
			console.log(req.params.productId);
			// doc.products.push(req.body.products[0]);
			doc.products.map((product) => {
				if (product._id == req.params.productId) {
					console.log("found product: " + product.name + product.price);
					product.name = req.body.name;
					product.price = req.body.price;

					console.log(product);
					doc.save();
				}
			});
			res.status(204).send(doc.products);
		}
	});
};

exports.deleteProduct = function (req, res) {
	User.findOne({ email: req.params.email }, function (err, doc) {
		if (err) {
			console.log(err);
			res.status(400).send("Invalid request!");
		} else {
			console.log(req.params.productId);
			// doc.products.push(req.body.products[0]);
			doc.products.map((product) => {
				if (product._id == req.params.productId) {
					console.log("found product: " + product.name + product.price);

					//
					var removed = doc.products.splice(doc.products.indexOf(product), 1);
					console.log(removed);
					doc.save();
				}
			});
			res.status(204).send(doc.products);
		}
	});
};

//deleteUser
exports.deleteUser = function (req, res) {
	return new Promise(function (resolve, reject) {
		User.remove({ email: req.params.email })
			.then(() => {
				resolve({ status: 200, message: "User Removed" });
				res.status(200).send("Deleted user: " + req.params.email);
			})
			.catch((err) => {
				reject({ status: 500, message: err });
				res.status(500).send("Invalid request!");
			});
	});
};
