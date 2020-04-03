const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
// const router = requir

const app = express();

const PORT = process.env.PORT || 5000;

//middleware

//init middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/members", require("./routes/api/members"));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});
