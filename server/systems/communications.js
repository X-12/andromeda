"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Communications extends System{
        constructor(){
            super("Communications")
            this.set("network","") //Blank = not connected.
            this.set("networks",Ship.Defaults.Communications.networks)
            this.set("waiting","")
            this.set("sent",[])
            this.set("inbox",[])
        }
        setupSocket(socket){
            super.setupSocket(socket)
        }
        sendMessage(to,message){
            //if(Ship.Power.Communications > some value && Ship.Health.Communications > some value && this.network != ""){
            let newsent = this.sent
            newsent.push({"to":to,"message":message})
            this.set("sent",newsent)
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
        disconnectFromNetwork(){
            this.set("network","")
        }
        stopWait(){
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
    }
    return new Communications()
}