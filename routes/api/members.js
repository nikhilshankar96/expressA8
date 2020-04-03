const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");

//all members route
router.get("/", (req, res) => {
	res.json(members);
});

//get single member
router.get("/:email", (req, res) => {
	const found = members.some(member => member.email == req.params.email);

	if (found) {
		res.json(members.filter(member => member.email == req.params.email));
	} else {
		res
			.status(400)
			.json({ msg: `Member with email: '${req.params.email}' not found!` });
	}
});

//create member
router.post("/create", (req, res) => {
	// res.send(req.body);
	const newMem = {
		id: uuid.v4(),
		email: req.body.email,
		password: req.body.password,
		products: req.body.products
	};

	if (!newMem.email || !newMem.password) {
		return res.status(400).json({ msg: "Please fill out proper details" });
	}
	members.push(newMem);
	res.json(members);
});

//update
router.put("/:email", (req, res) => {
	const found = members.some(member => member.email == req.params.email);

	if (found) {
		const updatedMem = req.body;
		members.forEach(member => {
			if (member.email == req.params.email) {
				member.email = updatedMem.email ? updatedMem.email : member.email;

				member.password = updatedMem.password
					? updatedMem.password
					: member.password;

				member.products = updatedMem.products
					? updatedMem.products
					: member.products;

				res.json({ msg: "Member updated", member });
			}
		});
		res.json(members.filter(member => member.email == req.params.email));
	} else {
		res
			.status(400)
			.json({ msg: `Member with email: '${req.params.email}' not found!` });
	}
});

//delete
router.delete("/:email", (req, res) => {
	const found = members.some(member => member.email == req.params.email);

	if (found) {
		res.json({
			msg: `Member with email: ${req.params.email} has been deleted!`,
			members: members.filter(member => member.email !== req.params.email)
		});
	} else {
		res
			.status(400)
			.json({ msg: `Member with email: '${req.params.email}' not found!` });
	}
});

module.exports = router;
