const mongoose = require("mongoose");

const Product = new mongoose.Schema({
	name: String,
	price: Number,
});

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	products: [Product],
});

userSchema.path("email").validate((val) => {
	emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
	return emailRegex.test(val);
}, "Invalid Email-Id");

userSchema.path("password").validate((val) => {
	passRegex = /^(?=.*\d)(?=[A-Z].*)(?=.*[`~!@#$%^&*()_\-+={}[\]\\|:;"'<>,\.\?\/]$).{8,30}$/gm;
	return passRegex.test(val);
}, "Invalid Password");

Product.path("name").validate((val) => {
	nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
	return nameRegex.test(val);
}, "Invalid product name");

Product.path("price").validate((val) => {
	priceRegex = /^[0-9]*$/gm;
	return priceRegex.test(val);
}, "Invalid Price!");
module.exports = mongoose.model("User", userSchema);
