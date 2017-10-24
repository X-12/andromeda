"use strict";
const React = require('react');
const styles = require('../../styles/layout/shade.scss')

module.exports = (io) => {
    class Shade extends React.Component {
        constructor(props){
            super(props)
            this.state = {visible:""}
            io.on("Lights.on",(data)=>{
                this.setState({visible: data ? "" : styles.visible})
            })
        }
        render(){
            return (
                <div className={styles.shade+' '+this.state.visible}></div>
            )
        }
    }
    return Shade
}