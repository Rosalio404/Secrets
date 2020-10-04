////// Modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

////// Variables
const port = 3000;

////// Mongoose
// Connection
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
// Schemas
const userSchema = new mongoose.Schema({
	email: String,
	password: String
});
// Encryption
const secret = "Heresyourlongstring";
userSchema.plugin(encrypt, {secret: secret, encryptedFields: ["password"]});
// Models
const User = new mongoose.model("User", userSchema);
////// Express
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// GET
app.get("/", function (req, res) {
		res.render("home");
});

app.get("/login", function (req, res) {
		res.render("login");
});

app.get("/register", function (req, res) {
		res.render("register");
});

// POST
app.post("/register", function (req, res) {
	const newUser = User({
		email: req.body.username,
		password: req.body.password
	});
	newUser.save(function (err) {
		if (!err) {
			console.log("New user added!");
			res.render("secrets");
		} else {
			res.send(err);
		}
	});
});

app.post("/login", function (req, res) {
	const username = req.body.username;
	const password = req.body.password;
	User.findOne({email: username}, function (err, foundUser) {
		if (!err) {
			if (foundUser) {
				if (foundUser.password === password) {
					res.render("secrets");
				} else {
					res.send("Wrong answer pal.");
				}
			} else {
				res.send("I dunno, I ain't never hearda no mayor..");
			}
		} else {
			res.send(err);
		}
	});
});

// Listen
app.listen(port, function () {
		console.log("Server started on port " + port);
});
