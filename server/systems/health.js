"use strict";

module.exports = (io,Ship) => {
    class Health {
        constructor(){
            super("Health")
            this.set("LifeSupport",100)
            this.set("Hull",100)
        }
    }
}