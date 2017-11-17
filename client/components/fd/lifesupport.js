"use strict";
const React = require('react');
const styles = require('../../styles/fd/lifesupport.scss')
module.exports = (io) => {
    class LifeSupportFD extends React.Component {
        constructor(props){
            super(props)
            this.state = {status:false}
            io.on("LifeSupport.status", (data) => {
                this.setState({status:data})
            })
        }
        setStatus(data){
            io.emit("LifeSupport.setStatus",data)
        }
        render(){
            return (
                <div>
                    <button className={styles.on+" "+ (this.state.status == true ? styles.selected : "")} onClick={()=>this.setStatus(true)}>On</button>
                    <button className={styles.off+" "+ (this.state.status == false ? styles.selected : "")} onClick={()=>this.setStatus(false)}>Off</button>
                </div>
            )
        }
    }
    return LifeSupportFD
}