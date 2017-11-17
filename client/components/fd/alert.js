"use strict";
const React = require('react');
const styles = require('../../styles/fd/alert.scss')
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
                    <button className={styles.red + " "+(this.state.status == 1 ? styles.selected : "")} onClick={()=>this.setStatus(1)}>1</button>
                    <button className={styles.yellow +" "+ (this.state.status == 2 ? styles.selected : "")} onClick={()=>this.setStatus(2)}>2</button>
                    <button className={styles.green+ " " + (this.state.status == 3 ? styles.selected : "")} onClick={()=>this.setStatus(3)}>3</button>
                </div>
            )
        }
    }
    return AlertFD
}