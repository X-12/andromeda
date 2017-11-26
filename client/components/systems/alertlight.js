"use strict";
const React = require('react')
const styles = require ('../../styles/systems/alertlight.scss')
const stylesconfig = ["other","red","yellow","green"]
module.exports = (io) => {
    class AlertLight extends React.Component {
        constructor(props){
            super(props)
            this.state = {status:3}
            io.on("Alert.status", (data) => {
                this.setState({status:data})
            })
        }
        render(){
            return (
                <div className={styles.alertlight+" "+styles[stylesconfig[this.state.status]]}>
                </div>
            )
        }
    }
    return AlertLight
}
