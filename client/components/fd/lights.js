"use strict";
const React = require('react');
require('../../styles/fd/lights.scss')
module.exports = (io) => {
    class LightsFD extends React.Component {
        constructor(props){
            super(props)
            this.state = {on:"Off"}
            io.on("Lights.on", (data) => {
                this.setState({on:data?"On":"Off"})
            })
        }
        setStatus(data){
            io.emit("Lights.setLight",data)
        }
        render(){
            return (
                <div>
                    <div className="LightsFD center">Lights: {this.state.on}</div>
                    <button className="LightsFD button on" onClick={()=>this.setStatus(true)}>On</button>
                    <button className="LightsFD button off" onClick={()=>this.setStatus(false)}>Off</button>
                </div>
            )
        }
    }
    return LightsFD
}