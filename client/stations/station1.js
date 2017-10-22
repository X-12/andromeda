"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')("localhost:3000")
require('./station')
const Shade = require('../components/layout/shade')(io)
const Alert = require('../components/systems/alert')(io)
//ReactDOM.render(<Shade />,document.getElementById("react-root"))
ReactDOM.render(<Alert />, document.getElementById("react-root"))