"use strict";
const express = require('express')
const path = require('path')
const app = express()
app.set("strict routing",true)
const port = 8000
const sendHTML = (res) => {
    res.sendFile(path.join(__dirname,"../client","index.html"));
}
const sendJS = (res,string) => {
    res.sendFile(path.join(__dirname,"../client","build/"+string+".js"))
}
app.get("/station1/", function(req,res){
    sendHTML(res)
})
app.get("/station1", function(req,res){
    res.redirect("/station1/")
})
app.get("/station1/main.js", function(req,res){
    sendJS(res,"station1")
})
app.use(express.static('public'))
app.listen(port, function(){
    console.log("Express listening on port "+port)
})