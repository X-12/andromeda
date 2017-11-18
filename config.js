module.exports = {
    Power: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Available: 0
    },
    Health: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Hull: 100
    },
    Alert: {
        status: 3
    },
    LifeSupport: {
        status: false,
        oxygen: 100, 
        minpower: 50,
        minhealth: 50
    },
    Lights: {
        on: false
    },
    Music: {
        song: ""
    },
    Warp:{
        Factor:1 //will change later
    },
    Impulse:{
        Factor:1 // will change later
    },
    Communications:{
        networks:{"Public":{login:"none"},"Starfleet":{login:"password",password:"beammeupscotty"},"StarfleetElite":{login:"password+approval",password:"makeitso"},"Direct":{login:"approval"}}
    },
    Repair: {
        steps: [
            "step 1 SYSTEM",
            "step 2", 
            "step 3", 
            "step 4", 
            "step 5 SYSTEM",
            "step 6", 
            "step 7", 
            "step 8", 
            "step 9 SYSTEM",
            "step 10", 
            "step 11", 
            "step 12",
            "step 13 SYSTEM"
        ]
    }
}