"use strict";
const React = require('react')
const styles = require ('../../styles/systems/thrusters.scss')

module.exports = (io) => {
    class Thrusters extends React.Component {
        constructor(props){
            super(props)
            this.state = {x:0,y:0,z:0,h:0,p:0,r:0}
            const values = ["x","y","z","h","p","r"]
            values.forEach((value)=>{
                io.on("Thrusters."+value, (data) => {
                    this.setState({[value]: data})
                })
            })
        }
        render(){
            return (
                <div>
                    <div className={}></div>
                </div>
            )
        }
    }
    return Thrusters
}
