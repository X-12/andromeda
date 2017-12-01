"use strict";
const React = require('react')
const styles = require ('../../styles/systems/thrusters.scss')
const order = [["x","p"],["r","z"],["h","y"]]
const orderc = [["X","P"],["R","Z"],["H","Y"]]

module.exports = (io) => {
    class Thrusters extends React.Component {
        constructor(props){
            super(props)
            this.state = {x:0,y:0,z:0,h:0,p:0,r:0,persistence:false}
            this.persistence = false
            const values = ["x","y","z","h","p","r"]
            values.forEach((value)=>{
                io.on("Thrusters."+value, (data) => {
                    this.setState({[value]: data})
                })
            })
        }
        mouseDown(index,event){
            this.mouseEvent(index,event)
        }
        mouseDrag(index,event){
            if(event.buttons != 0){
                this.mouseEvent(index,event)
            }
        }
        mouseEvent(index,event){
            console.log(index)
            let xPos = (event.nativeEvent.offsetX - 50.0)/50.0
            let yPos = (event.nativeEvent.offsetY - 50.0)/-50.0
            io.emit("Thrusters.set"+orderc[index][0],xPos)
            io.emit("Thrusters.set"+orderc[index][1],yPos)
        }
        mouseDone(index){
            if(!this.state.persistence){
                io.emit("Thrusters.set"+orderc[index][0],0)
                io.emit("Thrusters.set"+orderc[index][1],0)
            }
        }
        mouseExit(index){
            if(!this.state.persistence){
                io.emit("Thrusters.set"+orderc[index][0],0)
                io.emit("Thrusters.set"+orderc[index][1],0)
            }
        }
        mouseReset(index){
            io.emit("Thrusters.set"+orderc[index][0],0)
            io.emit("Thrusters.set"+orderc[index][1],0)
        }
        setPersistence(value){
            this.setState({persistence:value})
            if(value == false){
                this.mouseReset(0)
                this.mouseReset(1)
                this.mouseReset(2)
            }
        }
        render(){
            return (
                <div>
                    <svg className={styles.box} width="100" height="100" onMouseDown={(event)=>{this.mouseDown(0,event)}} onMouseMove={(event)=>{this.mouseDrag(0,event)}} onMouseUp={()=>{this.mouseDone(0)}} onMouseLeave={()=>{this.mouseExit(0)}}>
                    <rect width="100" height="100" fill="rgb(0,0,0)" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgb(0,0,255)" strokeWidth="2" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgb(0,255,0)" strokeWidth="2" />
                    <circle cx={this.state[order[0][0]]*50+50} cy={this.state[order[0][1]]*-50+50} r="5" fill="rgb(255,0,0)" />
                    </svg>

                    <svg className={styles.box} width="100" height="100" onMouseDown={(event)=>{this.mouseDown(1,event)}} onMouseMove={(event)=>{this.mouseDrag(1,event)}} onMouseUp={()=>{this.mouseDone(1)}} onMouseLeave={()=>{this.mouseExit(1)}}>
                    <rect width="100" height="100" fill="rgb(0,0,0)" />
                    <circle cx="50" cy="50" r="50" stroke="rgb(0,0,255)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="10" stroke="rgb(0,255,0)" strokeWidth="2" />
                    <circle cx={this.state[order[1][0]]*50+50} cy={this.state[order[1][1]]*-50+50} r="5" fill="rgb(255,0,0)" />
                    </svg>

                    <svg className={styles.box} width="100" height="100" onMouseDown={(event)=>{this.mouseDown(2,event)}} onMouseMove={(event)=>{this.mouseDrag(2,event)}} onMouseUp={()=>{this.mouseDone(2)}} onMouseLeave={()=>{this.mouseExit(2)}}>
                    <rect width="100" height="100" fill="rgb(0,0,0)" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgb(0,255,0)" strokeWidth="2" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgb(0,0,255)" strokeWidth="2" />
                    <circle cx={this.state[order[2][0]]*50+50} cy={this.state[order[2][1]]*-50+50} r="5" fill="rgb(255,0,0)" />
                    </svg>

                    {this.state.persistence?<button onClick={()=>{this.setPersistence(false)}}>Turn Off Persistence</button>:<button onClick={()=>{this.setPersistence(true)}}>Turn On Persistence</button>}
                </div>
            )
        }
    }
    return Thrusters
}
