"use strict";

module.exports = (io,Ship) =>{
    const System = require("./system")(io,Ship)
    const possibleSteps = Ship.Defaults.Repair.steps
    var reportLength = 10
    var currentRepair = ""
    var healthIncrement = 0
    class Repair extends System{
        constructor(){
            super("Repair")
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
            currentRepair = system
            reportLength = Math.ceil(((Ship.Defaults.Health[system] - Ship.Health[system]) / 10) * Math.pow(10, -1)) / Math.pow(10, x)
            io.emit("Repair.damageRepot", createDamageReport())
            healthIncrement = (Ship.Defaults.Health[system] - Ship.Health[system]) / reportLength
        }
        completeStep() {
            Ship.Health.set(currentRepair, Ship.Health[currentRepair] + healthIncrement)
        }
        createDamageReport() {
            var report = []
            for (var i = 0; i < reportLength; i++){
                shuffleArray()
                function shuffleArray() {
                    var possibleStep = possibleSteps[Math.floor(Math.random() * possibleSteps.length)]
                    possibleStep = possibleStep.replace(/SYSTEM/g, currentRepair)
                    console.log(possibleStep)
                    if(report.includes(possibleStep)) {
                        shuffleArray()
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