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
const routeStation = (name) => {
    app.get("/"+name+"/", (req,res) => {
        sendHTML(res)
    })
    app.get("/"+name, (req,res) => {
        res.redirect("/"+name+"/")
    })
    app.get("/"+name+"/main.js", (req,res)=>{
        sendJS(res,name)
    })
}
const stations = ["captain","navigations","tactical","operations","engineer","mvs","fd"]
stations.forEach((name)=>{
    routeStation(name)
})
app.use(express.static('public'))
app.listen(port, function(){
    console.log("Express listening on port "+port)
})