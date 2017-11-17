"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')("localhost:3000")
require('./station')
class ReactRoot extends React.Component {
    render(){
        return (
            <div>

            </div>
        )
    }
}
ReactDOM.render(<ReactRoot />, document.getElementById("react-root"))