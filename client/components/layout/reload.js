"use strict";
const React = require('react')

module.exports = (io) => {
    class Reload extends React.Component {
        constructor(props){
            super(props)
            io.on("Reload.reloadAll", (data) => {
                location.reload()
            })
        }
        render(){
            return (null)
        }
    }
    return Reload
}
