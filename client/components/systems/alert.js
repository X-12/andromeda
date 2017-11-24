"use strict";
const React = require('react')
const styles = require ('../../styles/systems/alert.scss')
const statuses = {0: "other", 1: "red", 2: "yellow", 3: "green"}

module.exports = (io) => {
    class Alert extends React.Component {
        constructor(props){
            super(props)
            this.state = {status: 3}
            io.on("Alert.status", (data) => {
                this.setState({status: data})
            })
        }
        setStatus(status){
            io.emit("Alert.setStatus",status)
        }
        render(){
            return (
                <div className={styles[statuses[this.state.status]]}>
                    <h3>Alert Status: {this.state.status}</h3>
                    <button className={styles.red} onClick={()=>this.setStatus(1)}>Red</button>
                    <button className={styles.yellow} onClick={()=>this.setStatus(2)}>Yellow</button>
                    <button className={styles.green} onClick={()=>this.setStatus(3)}>Green</button>
                </div>
            )
        }
    }
    return Alert
}
