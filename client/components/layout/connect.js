"use strict";
const React = require('react');
const styles = require('../../styles/layout/connect.scss')

module.exports = (io) => {
    class Connect extends React.Component {
        constructor(props){
            super(props)
            this.state = {visible:styles.visible}
            io.on("connect",()=>{
                this.setState({visible: ""})
            })
            io.on("disconnect",(reason)=>{
                this.setState({visible:styles.visible})
            })
        }
        render(){
            return (
                <div className={styles.shade+' '+this.state.visible}>
                <h1>Connecting...</h1>
                <button onClick={()=>{location.reload()}}>Reload</button>
                </div>
            )
        }
    }
    return Connect
}