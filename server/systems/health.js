"use strict";

module.exports = (io,Ship) => {
    const System = require("./system")(io,Ship)
    class Health extends System {
        constructor(){
            super("Health")
            this.set("Sensors", Ship.Defaults.Health.Sensors)
            this.set("Impulse", Ship.Defaults.Health.Impulse)
            this.set("Warp", Ship.Defaults.Health.Warp)
            this.set("Communications", Ship.Defaults.Health.Communications)
            this.set("LifeSupport", Ship.Defaults.Health.LifeSupport)
            this.set("Radar", Ship.Defaults.Health.Radar)
            this.set("Thrusters", Ship.Defaults.Health.Thrusters)
            this.set("Targeting", Ship.Defaults.Health.Targeting)
            this.set("Hull", Ship.Defaults.Health.Hull)
        }
    }
    return new Health()
}