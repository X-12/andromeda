"use strict";
const React = require('react');

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
                    Lights: {this.state.on}<br />
                    <button onClick={()=>this.setStatus(true)}>On</button>
                    <button onClick={()=>this.setStatus(false)}>Off</button>
                </div>
            )
        }
    }
    return LightsFD
}