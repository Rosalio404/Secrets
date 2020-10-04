////// Modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");

////// Variables
const port = 3000;

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

// Listen
app.listen(port, function () {
		console.log("Server started on port " + port);
});
