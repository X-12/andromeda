"use strict";
const React = require('react');
require('../../styles/fd/health.scss')
module.exports = (io) => {
    class HealthFD extends React.Component {
        constructor(props){
            super(props)
            this.state = {}
            this.values = ["Sensors","Impulse","Warp","Communications","LifeSupport","Radar","Targeting","Hull"]
            this.values.forEach((value)=>{
                this.state[value] = 0
                io.on("Health."+value, (data)=>{
                    this.setState({[value]:data})
                })
            })
        }
        render(){
            return (
                <div>
                    <ul>
                    this.values.map((item)=><li key={item}>{this.state[item]}</li>)
                    </ul>
                </div>
            )
        }
    }
}