"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Sensors extends System {
        constructor(){
            super("Sensors")
            this.set("scanning","")
            this.set("logs",[])
            this.set("analysing","")
        }
        startScan(type){
            //if(Ship.Power.Sensors > some value && Ship.Health.Sensors > some value){
                this.set("scanning",type)
            //}
        }
        completeScan(result){
            let newlogs = this.logs
            newlogs.push({action:"scan",type:this.scanning,result:result})
            this.set("logs",newlogs)
            this.set("scanning","")
        }
        completeAnalyse(result){
            let newlogs = this.logs
            newlogs.push({action:"analyse",type:this.analysing,result:result})
            this.set("logs",newlogs)
            this.set("analysing","")
        }
        startAnalyse(type){
            //if(Ship.Power.Sensors > some value && Ship.Health.Sensors > some value){
                this.set("analysing",type)
            //}
        }
        addLog(action,type,result){
            let newlogs = this.logs
            newlogs.push({action:action,type:type,result:result})
            this.set("logs",newlogs)
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Sensors.startScan",(data)=>{
                this.startScan(data)
            })
            socket.on("Sensors.startAnalyse",(data)=>{
                this.startAnalyse(data)
            })
            socket.on("Sensors.completeScan",(data)=>{
                this.completeScan(data)
            })
            socket.on("Sensors.completeAnalyse",(data)=>{
                this.completeAnalyse(data)
            })
            socket.on("Sensors.addLog",(data)=>{
                this.addLog(data.action,data.type,data.result)
            })
        }
        setupWatches(){
            Ship.Power.watch("Sensors",this.powerChanged,Ship.Sensors)
            Ship.Health.watch("Sensors",this.healthChanged,Ship.Sensors)
        }
        powerChanged(){
            if(Ship.Power.Sensors < Ship.Defaults.Sensors.minpower){
                this.set("scanning","")
                this.set("analysing","")
            }
        }
        healthChanged(){
            if(Ship.Health.Sensors < Ship.Defaults.Sensors.minhealth){
                this.set("scanning","")
                this.set("analysing","")
            }
        }
    }
    return new Sensors()
}