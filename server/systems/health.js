"use strict";

module.exports = (io,Ship) => {
    const System = require("./system")(io,Ship)
    class Health extends System {
        constructor(){
            super("Health")
            this.set("LifeSupport",100)
            this.set("Hull",100)
        }
    }
    return new Health()
}