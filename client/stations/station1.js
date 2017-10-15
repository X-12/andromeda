"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')
const Shade = require('../components/layout/shade')(io)
ReactDOM.render(<Shade />,document.getElementById("react-root"))