"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Communications extends System{
        constructor(){
            super("Communications")
            this.set("network","") //Blank = not connected.
            this.set("networks",Ship.Defaults.Communications.networks)
            this.set("waiting","")
            this.set("asking","")
            this.set("sent",[])
            this.set("inbox",[])
            this.set("calling",false)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Communications.sendMessage",(data)=>{
                this.sendMessage(data.to,data.message)
            })
            socket.on("Communications.addMessageToInbox",(data)=>{
                this.addMessageToInbox(data.from,data.message)
            })
            socket.on("Communications.connectToNetwork",(data)=>{
                this.connectToNetwork(data.name,data.options)
            })
            socket.on("Communications.removeMessageFromInbox",(data)=>{
                this.removeMessageFromInbox(data)
            })
            socket.on("Communications.disconnectFromNetwork",(data)=>{
                this.disconnectFromNetwork()
            })
            socket.on("Communications.cancelConnect",(data)=>{
                this.cancelConnect()
            })
            socket.on("Communications.addNetwork",(data)=>{
                this.addNetwork(data.name,data.options)
            })
            socket.on("Communications.removeNetwork",(data)=>{
                this.removeNetwork(data)
            })
            socket.on("Communications.confirmConnect",(data)=>{
                this.confirmConnect()
            })
            socket.on("Communications.rejectConnect",(data)=>{
                this.rejectConnect()
            })
            socket.on("Communications.createIncomingConnect",(data)=>{
                this.createIncomingConnect(data)
            })
            socket.on("Communications.rejectIncomingConnect",(data)=>{
                this.rejectIncomingConnect()
            })
            socket.on("Communications.confirmIncomingConnect",(data)=>{
                this.confirmIncomingConnect()
            })
            socket.on("Communications.initiateCall",(data)=>{
                this.initiateCall()
            })
            socket.on("Communications.endCall",(data)=>{
                this.endCall()
            })
        }
        sendMessage(to,message){
            //if(Ship.Power.Communications > some value && Ship.Health.Communications > some value && this.network != ""){
            let newsent = this.sent
            newsent.push({"to":to,"message":message})
            this.set("sent",newsent)
        }
        initiateCall(){
            //if(Ship.Power.Communications > some value && Ship.Health.Communications > some value && this.network == "Direct"){
            this.set("calling",true)
            //}
        }
        endCall(){
            this.set("calling",false)
        }
        addMessageToInbox(from,message){
            let newinbox = this.inbox
            newinbox.push({"from":from,"message":message})
            this.set("inbox",newinbox)
        }
        connectToNetwork(name,options){
            //if(Ship.Power.Communications > some value && Ship.Health.Communications > some value){
            if(this.network[name].login == "none"){
                this.set("network",name)
            }
            if(this.network[name].login == "password"){
                if(options.password == this.network[name].password){
                    this.set("network",name)
                }
                else{
                    //incorrect password
                }
            }
            if(this.network[name].login == "password+approval"){
                if(options.password == this.network[name].password){
                    this.set("waiting",name)
                }
                else{
                    //incorrect password
                }
            }
            if(this.network[name].login == "approval"){
                this.set("waiting",name)
            }
            //}
        }
        removeMessageFromInbox(index){
            let newinbox = this.inbox
            newinbox.splice(index,1)
            this.set("inbox",newinbox)
        }
        disconnectFromNetwork(){
            this.set("network","")
        }
        cancelConnect(){
            this.set("waiting","")
        }
        addNetwork(name,options){
            let newnetworks = this.networks
            newnetworks[name] = options
            this.set("networks",newnetworks)
        }
        removeNetwork(name){
            let newnetworks = this.networks
            delete newnetworks[name]
            this.set("networks",newnetworks)
        }
        confirmConnect(){
            this.set("network",this.waiting)
            this.set("waiting","")
        }
        rejectConnect(){
            this.set("waiting",false)
        }
        //These next functions are only for direct connections being made TO the ship, not the ship creating direct connections to OTHERS.
        createIncomingConnect(from){
            this.set("asking",from)
        }
        rejectIncomingConnect(){
            this.set("asking","")
        }
        confirmIncomingConnect(){
            this.set("network","Incoming")
            this.set("asking","")
        }
    }
    return new Communications()
}