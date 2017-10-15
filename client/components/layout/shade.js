"use strict";
const React = require('react');
const styles = require('../../styles/layout/shade.scss')

module.exports = (io) => {
    class Shade extends React.Component {
        constructor(props){
            super(props)
            this.state = {visible:""}
            io.on("Lights.on",(data)=>{
                this.setState({visible: data ? "" : "visible"})
            })
        }
        render(){
            return (
                <div id="shade" className={this.state.visible}></div>
            )
        }
    }
    return Shade
}