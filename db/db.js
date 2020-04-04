var mongoose = require("mongoose");

mongoose.connect(
	"mongodb://localhost:27017/ExpressDB",
	{ useNewUrlParser: true },
	(err) => {
		if (!err) {
			console.log("MongoDB Connection Succeeded on 27017");
		} else {
			console.log("Error in DB Connection: " + err);
		}
	}
);

require("./user.model");
