"use strict";

module.exports = (io,Ship) => {
    const System = require("./system")(io,Ship)
    class Health extends System {
        constructor(){
            super("Health")
            this.set("LifeSupport", Ship.Defaults.Health.LifeSupport)
            this.set("Hull",Ship.Defaults.Health.Hull)
        }
    }
    return new Health()
}