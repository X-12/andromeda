"use strict";
const React = require('react');
require('../../styles/fd/lights.scss')
module.exports = (io) => {
    class LightsFD extends React.Component {
        constructor(props){
            super(props)
            this.state = {on:"Off"}
            io.on("Lights.on", (data) => {
                this.setState({on:data})
            })
        }
        setStatus(data){
            io.emit("Lights.setLight",data)
        }
        render(){
            return (
                <div>
                    <button className={"LightsFD on " + (this.state.on == true ? "selected" : "")} onClick={()=>this.setStatus(true)}>On</button>
                    <button className={"LightsFD off " + (this.state.on == false ? "selected" : "")} onClick={()=>this.setStatus(false)}>Off</button>
                </div>
            )
        }
    }
    return LightsFD
}