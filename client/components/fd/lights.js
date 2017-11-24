"use strict";
const React = require('react');
const styles = require('../../styles/fd/lights.scss')
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
                    <button className={styles.on+ " " + (this.state.on == true ? styles.selected : "")} onClick={()=>this.setStatus(true)}>On</button>
                    <button className={styles.off+" " + (this.state.on == false ? styles.selected : "")} onClick={()=>this.setStatus(false)}>Off</button>
                </div>
            )
        }
    }
    return LightsFD
}