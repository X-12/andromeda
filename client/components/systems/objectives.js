"use strict";
const React = require('react')
const styles = require ('../../styles/systems/objectives.scss')
const markdown = require('markdown').markdown
module.exports = (io) => {
    class Objectives extends React.Component {
        constructor(props){
            super(props)
            this.state = {objectives: ""}
            io.on("Objectives.message", (data) => {
                this.setState({objectives: data})
            })
            io.emit("Objectives.setMessage","Hello *world*")
        }
        render(){
            return (
                <div className={styles.objectives} dangerouslySetInnerHTML={{__html:markdown.toHTML(this.state.objectives)}}>
                </div>
            )
        }
    }
    return Objectives
}
