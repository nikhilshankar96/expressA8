require("./db/db");
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const bodyParser = require("body-parser");
//
const user = require("./routes/userRoutes");
//
const app = express();

const PORT = process.env.PORT || 5000;

//exception handling
process.on("uncaughtException", function (err) {
	console.error(err);
	console.log("Node NOT Exiting...");
});

//middleware
//init middleware
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/user", user);

//port
app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
