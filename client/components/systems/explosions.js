"use strict";
const React = require('react');
const styles = require ('../../styles/systems/explosions.scss')
const config = require ('../../../config.js')
module.exports = (io) => {
    class Explosions extends React.Component {
        constructor(props){
            super(props)
            this.state = {x:0,y:0,degrees:0}
            this.list = []
            io.on("Explosions.explosion", (data) => {
                data.start = Date.now()
                this.list.push(data)
            })
        }
        componentDidMount(){
            requestAnimationFrame(()=>{this.updateExplosions()})
        }
        updateExplosions(){
            let x = 0
            let y = 0
            let degrees = 0
            let now = Date.now()
            for (var i = this.list.length; i-- > 0; ){
                let magnitude = this.list[i].magnitude*Math.pow(0.5,(now-this.list[i].start)/this.list[i].period)
                if(magnitude<0.5){
                    this.list.splice(i,1)
                }
                else{
                    x += (Math.random()-0.5)*magnitude
                    y += (Math.random()-0.5)*magnitude
                    degrees += (Math.random()-0.5)*config.Explosions.degreesperpixel*magnitude
                }
            }
            this.setState({x:x,y:y,degrees:degrees})
            requestAnimationFrame(()=>{this.updateExplosions()})
        }
        render(){
            return (
            <div className={styles.container} style={{top:this.state.y,left:this.state.x,transform:"rotate("+this.state.degrees+"deg)"}}>
                {this.props.children}
            </div>
            )
        }
    }
    return Explosions;
}