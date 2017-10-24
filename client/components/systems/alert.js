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
        render(){
            return (
                <div className={styles[statuses[this.state.status]]}>
                    <h3>Alert Status: {this.state.status}</h3>
                </div>
            )
        }
    }
    return Alert
}
