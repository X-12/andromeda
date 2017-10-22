"use strict";
const React = require('react');
require('../../styles/fd/alert.scss')
module.exports = (io) => {
    class AlertFD extends React.Component {
        constructor(props){
            super(props)
            this.state = {status:3}
            io.on("Alert.status", (data) => {
                this.setState({status:data})
            })
        }
        setStatus(data){
            io.emit("Alert.setStatus",data)
        }
        render(){
            return (
                <div>
                    <div className="AlertFD center">Alert: {this.state.status}</div>
                    <button className="AlertFD button red" onClick={()=>this.setStatus(1)}>1</button>
                    <button className="AlertFD button yellow" onClick={()=>this.setStatus(2)}>2</button>
                    <button className="AlertFD button green" onClick={()=>this.setStatus(3)}>3</button>
                </div>
            )
        }
    }
    return AlertFD
}