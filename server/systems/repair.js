"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    class Repair extends System{
        constructor(){
            super("Repair")
            this.set("currentRepair", "")
            this.possibleSteps = Ship.Defaults.Repair.steps
            this.reportLength = 10
            this.healthIncrement = 0
        }
        setupSocket(socket){
            super.setupSocket(socket)
            socket.on("Repair.beginRepair", (value)=>{
                beginRepair(value.system)
            })
            socket.on("Repair.completeStep", (value)=>{
                completeStep()
            })
        }
        beginRepair(system) {
            this.set("currentRepair", system)
            this.reportLength = Math.ceil(((Ship.Defaults.Health[system] - Ship.Health[system]) / 10) * Math.pow(10, -1)) / Math.pow(10, x)
            io.emit("Repair.damageRepot", createDamageReport())
            this.healthIncrement = (Ship.Defaults.Health[system] - Ship.Health[system]) / reportLength
        }
        completeStep() {
            Ship.Health.set(this.currentRepair, Ship.Health[currentRepair] + healthIncrement)
        }
        createDamageReport() {
            var report = []
            for (var i = 0; i < this.reportLength; i++){
                shuffleStepsArray()
                function shuffleStepsArray() {
                    var possibleStep = possibleSteps[Math.floor(Math.random() * possibleSteps.length)]
                    possibleStep = possibleStep.replace(/SYSTEM/g, currentRepair)
                    console.log(possibleStep)
                    if(report.includes(possibleStep)) {
                        shuffleStepsArray()
                    } else {
                        report.push(possibleStep);
                    }
                }
            }
            return report;
        }
    }
    return new Repair()
}