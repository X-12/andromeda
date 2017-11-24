"use strict";
const React = require('react')
const styles = require ('../../styles/systems/authentication.scss')

module.exports = (io) => {
    class Authentication extends React.Component {
        constructor(props){
            super(props)
            this.state = {list: []}
            io.on("Authentication.list", (data) => {
                this.setState({list: data})
            })
        }
        accept(event,data,index){
            io.emit(event,data)
            this.removeIndex(index)
        }
        reject(index){
            this.removeIndex(index)
        }
        removeIndex(index){
            io.emit("Authentication.remove",index)
        }
        render(){
            return (
                <ul>
                    {this.state.list.map((item,index)=>{
                        return <li key={item}>{item.event}({item.data}) <button onClick={()=>{this.accept(item.event,item.data,index)}}>Accept</button><button onClick={()=>{this.reject(index)}}>Reject</button></li>
                    })}
                </ul>
            )
        }
    }
    return Authentication
}
