var express = require("express");
var app = express();
var bodyParser = require("body-parser")
const mongoose = require("mongoose");
var path = require("path");
var PORT = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/register")

var db = mongoose.connection;
db.on("open",function(){
    console.log("connection succeed")
});

db.on("error",function(){
    console.log("db error")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    }));
app.use(express.static(path.join(__dirname)));


app.get("/view",function(req,res)
{
  res.sendFile(__dirname+"/login.html")
});


app.post('/sign_up',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "password":pass
    }
    db.collection('User details').insertOne(data,function(req,res){

    });
    res.sendFile(__dirname+"/success.html")
});
app.listen(PORT,function(){
    console.log("server listening at port 3000")
})
