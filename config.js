//const alfador = require("alfador")
module.exports = {
    Power: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Radar:100,
        Targeting: 100,
        Available: 0
    },
    Health: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Hull: 100,
        Radar: 100,
        Targeting: 100
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
    Objectives:{
        message:"Test"
    },
    Targeting:{
        minpower:50,
        minhealth:50,
        targetrange:50,
        loserange:70
    },
    Course:{
        //target:new Vec3(0,0,0),
        status:false,
        minthrustershealth:75,
        minthrusterspower:75,
        minradarhealth:75,
        minradarpower:75
    }
}