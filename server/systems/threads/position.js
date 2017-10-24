const mydata = {x:0,y:0,z:0,pitch:0,yaw:0,roll:0,v:0}
const interval = 100
process.on("message", (data) =>{
    for(var key in data){
        if(data.hasOwnProperty(key)){
            mydata[key] = data[key]
        }
    }
})
updatePosition = () =>{
    mydata.x += Math.cos(mydata.pitch)*Math.sin(mydata.yaw)*mydata.v*(1000/interval)
    mydata.y += Math.cos(mydata.pitch)*Math.cos(mydata.yaw)*mydata.v*(1000/interval)
    mydata.z += Math.sin(mydata.pitch)*mydata.v*(1000/interval)
    process.send({x:mydata.x,y:mydata.y,z:mydata.z})
}
setInterval(updatePosition,interval)