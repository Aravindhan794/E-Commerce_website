var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser")
var path = require("path");
const PORT = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/register");

var db = mongoose.connection;

db.on('error',function(){
    console.log("db error")
});

db.on('open',function(){
    console.log("connnection succeeded")
})

function Alert(){
    alert("We value your input and aim to enhance your shopping journey..!")
}

app.use(express.static(path.join(__dirname)))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({}));

app.get("/contact",function(req,res){
    res.sendFile(__dirname+"/contact.html")
})

app.post('/post',function(req,res){
    var name = req.body.Name;
    var email = req.body.Email;
    var message = req.body.message;

    var data = {
        "Name":name,
        "Email":email,
        "message":message
    }
    db.collection("User message").insertOne(data,function(req,res){

    });
    res.sendFile(__dirname+"/contact_success.html")
});

app.listen(PORT,function(){
       console.log("server is listening in port on 3001")
});