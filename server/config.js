module.exports = {
    Power: {
        LifeSupport: 100,
        Available: 0
    },
    Health: {
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
    Communications:{
        networks:{"Public":{login:"none"},"Starfleet":{login:"password",password:"beammeupscotty"},"StarfleetElite":{login:"password+approval",password:"makeitso"},"Direct":{login:"approval"}}
    }
}