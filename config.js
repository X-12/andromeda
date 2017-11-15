module.exports = {
    Power: {
        Sensors: 100,
        Impulse: 100,
        Warp: 100,
        Communications: 100,
        LifeSupport: 100,
        Radar:100,
        Thrusters:100,
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
        Radar: 100
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
    }
}