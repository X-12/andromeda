const express = require('express')
const path = require('path')
const app = express()

app.get("/station1", function(req,res){
    res.sendFile(path.join(__dirname,"../client","station1/index.html"))
})
app.use(express.static('public'))
app.listen(8000, function(){
    console.log("Listening on port 8000")
})