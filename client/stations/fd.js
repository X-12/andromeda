"use strict";
const React = require('react')
const ReactDOM = require('react-dom')
const io = require('socket.io-client')("localhost:3000")
require('./station')
const Health = require('../components/fd/health')
class ReactRoot extends React.Component {
    render(){
        return (
            <div>
                <Health />
            </div>
        )
    }
}
ReactDOM.render(<ReactRoot />, document.getElementById("react-root"))