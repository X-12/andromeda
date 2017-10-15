"use strict";
const React = require('react');
const styles = require('../styles/shade.scss')

module.exports = (io) => {
    class Shade extends React.Component {
        render(){
            return (
                <div id="shade"></div>
            )
        }
    }
    return Shade
}