"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')
const Shade = require('../components/shade')(null)
import '../styles/main.scss'
ReactDOM.render(<Shade />,document.getElementById("test"))