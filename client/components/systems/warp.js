"use strict";
const React = require('react')
const styles = require ('../../styles/systems/warp.scss')

module.exports = (io) => {
    class Warp extends React.Component {
        constructor(props){
            super(props)
            this.state = {speed: 0}
            io.on("Warp.speed", (data) => {
                this.setState({speed: data})
            })
        }
        setSpeed(speed){
            io.emit("Warp.setSpeed",speed)
        }
        render(){
            return (
                <input type="range" min="0" max="9.9" value={this.state.speed} class="slider" />
            )
        }
    }
    return Warp
}
