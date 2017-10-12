"use strict";
//import styles from "./style.scss"
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')
const Test = require('../components/test')("hello")

ReactDOM.render(<Test />,document.getElementById("test"))