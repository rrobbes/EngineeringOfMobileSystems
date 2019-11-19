import React from 'react';
import { View } from 'react-native';
import Svg, {G, Circle, Line, Text as SvgText } from 'react-native-svg';
import { Magnetometer } from 'expo-sensors';

const CompassFace = ({width, height}) => (
    <G>
      <Circle cx={width/2} cy={height/2} r={width/2} fill="black" />
      <SvgText fill="white" fontSize="30" x={(width/2) - 15} y={30}>N</SvgText>
      <SvgText fill="white" fontSize="30" x={(width/2) - 15} y={height - 10}>S</SvgText>
      <SvgText fill="white" fontSize="30" x={10} y={(height/2) + 15}>W</SvgText>
      <SvgText fill="white" fontSize="30" x={width - 30} y={(height/2) + 15}>E</SvgText>
    </G>
  )
  
  const Needle = ({size}) => (
    <Line x1={size/2} y1={0} x2={size/2} y2={size} stroke="red" strokeWidth="3"/>
  )
  
  const SvgCompass = ({size, angle}) => (
    <Svg height={size} width={size}>
      <CompassFace width={size} height={size} />
      <G rotation={angle} origin={`${size/2}, ${size/2}`}><Needle size={size}/></G>
      <Circle r="4" cx={size/2} cy={size/2} fill="white" />
    </Svg>
  )
  
export class Compass extends React.Component {
  
    state = {isReady: false, v: null}
  
  
    magneto2angle = () => {
      let theta = "0rad"
      const pi = Math.PI
      if (this.state.v) {
          let {x, y, z} = this.state.v
          theta = Math.atan(-x/y)
          if (-x > 0 && y > 0) {
            // nothing
          } else if (y > 0) {
            theta += pi
          } else {
            theta += pi * 2
          }
      }
  
      return theta * (180 / pi)
    }
  
    setupMagnetometer = async () => {
      Magnetometer.addListener((v) => {
          this.setState({v: v})
      })
    }
  
    componentDidMount() {
      this.setupMagnetometer()
    }
  
    render() {
      return this.state.v?
        <SvgCompass size={this.props.size} angle={this.magneto2angle()} />:
        <View />
    }
  
  }