"use strict";
const React = require('react')
const styles = require ('../../styles/systems/lifesupport.scss')
const config = require ('../../../config.js')

module.exports = (io) => {
    class LifeSupport extends React.Component {
        constructor(props){
            super(props)
            this.state = {status: false,oxygen:100}
            io.on("LifeSupport.status", (data) => {
                this.setState({status: data})
            })
            io.on("LifeSupport.oxygen", (data) => {
                this.setState({oxygen: data})
            })
        }
        setStatus(status){
            io.emit("LifeSupport.setStatus",status)
        }
        render(){
            return (
                <div>
                    <div className={styles.oxygen} style={{width:this.state.oxygen/config.LifeSupport.oxygen*100}}></div>
                    {this.state.status?(<button onClick={()=>{this.setStatus(false)}}>Turn Off</button>):(<button onClick={()=>{this.setStatus(true)}}>Turn On</button>)}
                    
                </div>
            )
        }
    }
    return LifeSupport
}
