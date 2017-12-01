"use strict";
const React = require('react')
const styles = require ('../../styles/systems/impulse.scss')

module.exports = (io) => {
    class Impulse extends React.Component {
        constructor(props){
            super(props)
            this.state = {speed: 0}
            io.on("Impulse.speed", (data) => {
                this.setState({speed: data})
            })
        }
        setSpeed(speed){
            io.emit("Impulse.setSpeed",speed)
        }
        render(){
            return (
                <input type="range" min="0" max="100" step="1" value={this.state.speed} onChange={(event)=>{this.setSpeed(parseFloat(event.target.value))}} className={styles.slider} />
            )
        }
    }
    return Impulse
}
