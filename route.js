var express = require("express");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const request = require("request");
var serviceAccount = require("./serviceAccountKey.json");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
 credential: cert(serviceAccount),
});
const path = require("path");
const { futimes } = require("fs");
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public")));
const db = getFirestore();
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/login.html");
});
app.get("/signup", function (req, res) {
 res.sendFile(__dirname + "/login.html");
});
app.get("/dashboard", function (req, res) {
 res.sendFile(__dirname + "/dashboard.html");
});

app.get("/login", function (req, res) {
 db.collection("music")
 .add({
 firstname: req.query.firstname,
 lastname: req.query.lastname,
 email: req.query.email,
 password: req.query.password,
 })
 .then(() => {
 res.sendFile(__dirname + "/login.html");
 });
});

app.get("/login", function (req, res) {
 var user = req.query.username;
 var pass = req.query.password1;
 db.collection("music")
 .get()
 .then(function (docs) {
 var flag = 0;
 docs.forEach((doc) => {
 if (user == doc.data().email && pass == doc.data().password) {
 flag = 1;
 }
 });
 res.sendFile(__dirname + "/dashboard.html");
 
 });
});
app.get("/",function(req,res){
      res.redirect("/dashboard");
});

app.listen(3000);