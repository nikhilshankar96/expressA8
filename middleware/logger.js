const moment = require("moment");
const logger = (req, res, next) => {
	console.log("Logger function: ");
	console.log(
		`${req.protocol}://${req.get("host")}${
			req.originalUrl
		}: ${moment().format()}`
	);

	next();
};

module.exports = logger;
