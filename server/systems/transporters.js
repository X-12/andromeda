"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Transporters extends System{
        constructor(){
            super("Transporters")
            this.set("objects", Ship.Defaults.Transporters.objects)
            this.set("online", Ship.Defaults.Transporters.online)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Transporters.transport", (value)=>{
                transport(value)
            })
            socket.on("Transporters.modifyObject", (value)=>{
                modifyObject(value)
            })
        }
        transport(data) {
            if (data.to.hasOwnProperty("name")) {
                if (data.from.name == data.to.name) {
                    var index = this.objects.findIndex(findObject, data.to)
                    this.objects[index] = this.objects[index].quantity + data.amount
                } else {
                    this.objects.push(createObject(data.from, data.to, data.amount))
                }
            } else {
                this.objects.push(createObject(data.from, data.to, data.amount))
            }
            var index = this.objects.findIndex(findObject, data.from)
            this.objects[index].quantity = this.objects[index].quantity - data.amount
            if (this.objects[index].quantity == 0) {
                this.objects.splice(index, 1)
            }
            this.set("objects", this.objects)
        }
        findObject(element) {
            if (element.hasOwnProperty("subResidence")) {
                if (element.name == this.name && element.residence == this.residence && element.subResidence == this.subResidence) {
                    return element
                }
            } else if (element.hasOwnProperty("name")) {
                if (element.name == this.name && element.residence == this.residence) {
                    return element 
                }
            } else {
                if (element.residence == this.residence) {
                    return element 
                }
            }
        }
        modifyObject(newObject) {
            var index = this.objects.findIndex(findObject, newObject) 
            if (index < 0) {
                var temp = {} 
                temp.residence = newObject.residence
                if (newObject.hasOwnProperty("subResidence")) {
                    temp.subResidence = newObject.subResidence
                }
                temp.status = newObject.status
                this.objects.push(temp)
                this.set("objects", this.objects)
            } else {
                this.objects[index].quantity = newObject.quantity
                this.objects[index].status = newObject.status
                if (this.objects[index].quantity == 0) {
                    this.objects.splice(index, 1)
                }
                this.set("objects", this.objects)
            }
        }
        createObject(from, to, amount) {
            var temp = {}
            temp.name = from.name
            temp.residence = to.residence
            if (from.hasOwnProperty("subResidence")) {
                temp.subResidence = to.subResidence
            }
            temp.quantity = amount
            temp.status = from.status
            return temp
        }
        setupWatches(){
            Ship.Health.watch("Transporters",this.healthChanged)
            Ship.Power.watch("Transporters",this.powerChanged)
        }
        healthChanged(){
            if(Ship.Health.Transporters < Ship.Defaults.Transporters.minhealth){
                this.set("online", false)
            } else {
                this.set("online", true)
            }
        }
        powerChanged(){
            if(Ship.Power.Transporters < Ship.Defaults.Transporters.minpower){
                this.set("online", false)
            } else [
                this.set("online", true)
            ]
        }
    }
    return new Transporters()
}