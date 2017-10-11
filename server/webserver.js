"use strict";
const express = require('express')
const path = require('path')
const app = express()
const port = 8000
app.get("/station1", function(req,res){
    res.sendFile(path.join(__dirname,"../client","station1/index.html"))
})
app.use(express.static('public'))
app.listen(port, function(){
    console.log("Express listening on port "+port)
})