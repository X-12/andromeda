"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const uuid = require("uuid/v4")
    const _ = require("lodash")
    const shipid = Ship.Objects.shipid
    class Transporters extends System{
        constructor(){
            super("Transporters")
            this.set("online", Ship.Defaults.Transporters.online)
            this.set("objects", {
                [shipid]: {
                    range: 1,
                    override: 0,
                    subResidences: {
                        [uuid()]: {
                            name: "Engineering",
                            info: "Main Engineering, Deck 12",
                            objects: {
                                [uuid()]: {
                                    name: "Warp Coil",
                                    type: 2,
                                    quantity: 20,
                                    available: 1
                                }
                            }
                        },
                        [uuid()]: {
                            name: "Sick Bay",
                            info: "Main Sick Bay, Deck 13",
                            objects: {
                                [uuid()]: {
                                    name: "Tricorder",
                                    type: 2,
                                    quantity: 15,
                                    available: 1
                                }
                            }
                        }
                    },
                    objects: {
                        [uuid()]: {
                            name: "Test Object",
                            type: 1,
                            quantity: 1,
                            available: 1
                        }
                    }
                }
            })
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Transporters.transport", (value)=>{
                transport(value)
            })
            socket.on("Transporters.modify", (value)=>{
                modify(value)
            })
        }
        transport(data) {
            if (this.objects[data.destination].range == 1 || this.objects[destination].override == 1){
                let destinationKey = _.findKey(this.objects[data.destination].objects, {name: [this.objects[data.object].name], type: [this.objects[data.object].type], available: [this.objects[data.object].available]})
                let temp = this.objects
                if (destinationKey == undefined) {
                    temp[data.destination].objects[uuid()] = {name: [this.objects[data.object].name], type: [this.objects[data.object].name], quantity: [data.amount], available: [this.objects[data.object].available]}
                    temp[data.object].quantity = temp[data.object].quantity - amount
                    if (temp[data.object].quantity <= 0) {
                        delete temp[data.object]
                    }
                } else {
                    temp[data.object].quantity = temp[data.object].quantity - amount
                    if (temp[data.object].quantity <= 0) {
                        delete temp[data.object]
                    }
                    temp[data.destination][destinationKey].quantity = temp[data.destination][destinationKey].quantity + data.amount
                }
                this.set("objects", temp)
            } else {
                io.emit("Transporters.error", "target not within range")
            }
        }
        modify(data) {
            let temp = this.objects
            switch (data.type) {
                case 1:
                //create transportable object
                temp[data.destination].objects[uuid()] = {name: [data.object.name], type: [data.object.type], quantity: [data.object.quantity], available: [data.object.available]}
                break

                case 2:
                //create subResidence
                temp[data.destination].subResidences[uuid()] = {name: [data.object.name], info: [data.object.info], objects: {}}
                break

                case 3:
                //delete transportable object
                delete temp[data.object]
                break
                
                case 4:
                //delete subResidence
                delete temp[data.object]
                break

                case 4:
                //modify
                temp[data.object] = data.modified
                break
            }
            this.set("objects", temp)
        }
        setupWatches(){
            Ship.Objects.watch("objects", Ship.Transporters.objectsUpdated)
            Ship.Health.watch("Transporters", Ship.Transporters.healthChanged)
            Ship.Power.watch("Transporters", Ship.Transporters.powerChanged)
        }
        objectsUpdated(){
            let temp = this.objects
            for(var key in Ship.Objects.objects){
                if(Ship.Objects.objects.hasOwnProperty(key) && key != Ship.Objects.shipid){
                    if(Ship.Radar.position.sub(Ship.Radar.objects[key].position).length() <= (Ship.Power.Transporters/Ship.Defaults.Power.Transporters)*Ship.Defaults.Transporters.Range){
                        temp[key].range = 1
                    } else {
                        temp[key].range = 0
                    }
                }
            }
            this.set("online", temp)
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
            } else {
                this.set("online", true)
            }
        }
    }
    return new Transporters()
}
