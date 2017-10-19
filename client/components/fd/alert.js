"use strict";
const React = require('react');

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
                    Alert: {this.state.status}<br />
                    <button onClick={()=>this.setStatus(1)}>1</button>
                    <button onClick={()=>this.setStatus(2)}>2</button>
                    <button onClick={()=>this.setStatus(3)}>3</button>
                </div>
            )
        }
    }
    return AlertFD
}