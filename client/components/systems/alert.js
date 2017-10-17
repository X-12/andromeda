"use strict";
const React = require('react')
const styles = require ('../../styles/systems/alert.scss')

module.exports = (io) => {
    class Alert extends React.Component {
        constructor(props){
            super(props)
            this.state = {status: 3}
            io.on("Alert.change", (data) => {
                this.setState({status: data})
            })
        }
        render(){
            return (
                <div id="alert">
                    <h3>Alert Status: {this.state.status}</h3>
                </div>
            )
        }
    }
    return Alert
}
