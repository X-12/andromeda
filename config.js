const Media = require("./public/media-manifest.json");

module.exports = {
    Power: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Radar:100,
        Thrusters:100,
        Targeting: 100,
        Transporters: 100,
        Available: 0
    },
    Health: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Hull: 100,
        Thrusters:100,
        Targeting: 100,
        Transporters: 100
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
        Factor:1,
        minhealth:50,
        minpower:50
    },
    Impulse:{
        Factor:1,
        minhealth:50,
        minpower:50
    },
    Communications:{
        networks:{"Public":{login:"none"},"Starfleet":{login:"password",password:"beammeupscotty"},"StarfleetElite":{login:"password+approval",password:"makeitso"},"Direct":{login:"approval"}}
    },
    Radar:{
        minpower:50,
        minhealth:50,
        Range:100
    },
    Thrusters:{
        Factor:1,
        AngularFactor:Math.PI/2,
        minhealth:50,
        minpower:50
    },
    Objectives:{
        message:"Test"
    },
    Targeting:{
        minpower:50,
        minhealth:50,
        targetrange:50,
        loserange:70
    },
    MVS:{
        screen: "landing"
    },
    Media,
    Transporters: {
        minhealth: 50,
        minpower: 50,
        objects: [
            {
                residence: "Space",
                status: 1
            },
            {
                name: "Warp Coil",
                residence: "USS Andromeda",
                subResidence: "Engineering",
                quantity: 20,
                status: 3
            },
            {
                name: "Warp Coil",
                residence: "USS Andromeda",
                subResidence: "Storage",
                quantity: 50,
                status: 3
            },
            {
                name: "Tricorder",
                residence: "USS Andromeda",
                subResidence: "Sick Bay",
                quantity: 15,
                status: 3
            },
            {
                name: "Bomb",
                residence: "USS Andromeda",
                quantity: 1,
                status: 1
            },
            {
                name: "Tree",
                residence: "Earth",
                quantity: 999999999,
                status: 0
            }
        ],
        online: true
    }
}