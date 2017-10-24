"use strict";

module.exports = (io,Ship) => {
    const System = require("./system")(io,Ship)
    class Health extends System {
        constructor(){
            super("Health")
            this.set("LifeSupport", Ship.Defaults.LifeSupport.health)
            this.set("Hull",Ship.Defaults.Hull.health)
        }
    }
    return new Health()
}