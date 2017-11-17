"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')("localhost:3000")
require('./station')
const Health = require('../components/fd/health')(io)
const LifeSupport = require('../components/fd/lifesupport')(io)
const Alert = require('../components/fd/alert')(io)
const Lights = require('../components/fd/lights')(io)
class ReactRoot extends React.Component {
    render(){
        return (
            <div>
                <Health />
                <LifeSupport />
                <Alert />
                <Lights />
            </div>
        )
    }
}
ReactDOM.render(<ReactRoot />, document.getElementById("react-root"))