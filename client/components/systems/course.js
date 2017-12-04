"use strict";
const React = require('react')
const styles = require ('../../styles/systems/course.scss')
const alfador = require("alfador")
const Quaternion = alfador.Quaternion
const Vec3 = alfador.Vec3

module.exports = (io) => {
    class Alert extends React.Component {
        constructor(props){
            super(props)
            this.state = {status:false,target:new Vec3(0,0,0),x:0,y:0,z:0}
            io.on("Course.target",(data)=>{
                this.setState({target:data})
            })
            io.on("Course.status",(data)=>{
                this.setState({status:data})
            })
        }
        setCourse(){
            io.emit("Course.setTarget",new Vec3(this.state.x,this.state.y,this.state.z))
        }
        setStatus(data){
            io.emit("Course.setStatus",data)
        }
        render(){
            return (
                <div>
                    Target:&lt;{this.state.target.x},{this.state.target.y},{this.state.target.z}&gt;
                    Status:{this.state.status?"True":"False"}
                    X:<input type="number" value="0" onChange={(e)=>{this.setState({x:e.target.value})}} />
                    Y:<input type="number" value="0" onChange={(e)=>{this.setState({y:e.target.value})}} />
                    Z:<input type="number" value="0" onChange={(e)=>{this.setState({z:e.target.value})}} />
                    <button onClick={()=>{this.setCourse()}}>Set Course</button>
                    {this.state.status?(<button onClick={()=>{this.setStatus(false)}}>Turn Off</button>):(<button onClick={()=>{this.setStatus(true)}}>Turn On</button>)}
                </div>
            )
        }
    }
    return Alert
}
