import React from 'react';
import { Text, View, Switch } from 'react-native';
import Svg, {Rect} from 'react-native-svg';


export const Bar = ({size = 300, color, max, value}) => {
    let absVal = Math.abs(value)
    if (absVal > max) {absVal = max}
    const multiplicator = size / max
    console.log("absval: " + absVal)
    console.log("absval * size: " + (absVal * size))
    return (
      <Svg width={size} height={20}>
        <Rect x={0} y={0} width={absVal * multiplicator} height={20} fill={color} stroke="black" strokeWidth="1" />
      </Svg>
    )
  }
  
export class Sensor extends React.Component {
    state = {
        data: null,
        enabled: false,
        available: false,
        bars: true,
        text: false
    }
  
  
    subscribe = async() => {
      //const available = await this.props.sensor.isAvailableAsync()
      if (this.state.available) {
        if (this.props.setupListener) { 
            this.sub = this.props.setupListener(this.listener) 
        } else {
        this.sub = this.props.sensor.addListener(this.listener)
        this.props.sensor.setUpdateInterval(this.props.interval)
        }
      }
    }
  
    checkAvailable = async() => {
      const available = await this.props.sensor.isAvailableAsync()
      this.setState({available: available})
    }
  
    toggleSensor = async enable => {
        this.setState({enabled: enable})
        enable?this.subscribe():this.unsubscribe()
    }
  
    toggleText = () => this.setState({text: !this.state.text})
    toggleBars = () => this.setState({bars: !this.state.bars})
  
    unsubscribe = () => {
  
      this.sub && this.sub.remove()
      this.sub = null
    } 
  
    listener = data => {
      if (this.props.listener) {
        this.props.listener(data)
      }
      this.setState({data: data})
    }
  
    componentDidMount() {
      this.checkAvailable()
    }
  
    render() {
      return (
        <View style={{borderColor: "black", borderWidth: 1}}>
            <View style= {{flexDirection: "row"}}>
            <Text>Sensor: {this.props.type}</Text>
            <Switch 
                onValueChange={this.toggleSensor} 
                value={this.state.enabled} 
                disabled={!this.state.available} />
            <Text>Text:</Text>
            <Switch 
                onValueChange={this.toggleText} 
                value={this.state.text}/>
            <Text>Bars:</Text>
            <Switch 
                onValueChange={this.toggleBars} 
                value={this.state.bars}/>
            </View>
          {this.state.text?<Text>{JSON.stringify(this.state.data)}</Text>:null}
          {(this.state.data&&this.state.bars)?this.props.renderData(this.state.data):null}
        </View>
      )
    }
  }
  