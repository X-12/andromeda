"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')
const Test = require('../components/test')
ReactDOM.render(<Test />,document.getElementById("test"))