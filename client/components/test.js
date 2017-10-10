"use strict";
const React = require('react');

module.exports = (stuff) => {
    class Test extends React.Component {
        render(){
            console.log(stuff);
            return (
            <img src="https://i.vimeocdn.com/portrait/58832_300x300" alt="" />
            )
        }
    }
    return Test;
}