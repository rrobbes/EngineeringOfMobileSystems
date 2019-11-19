import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Speech from 'expo-speech';
import {
  Accelerometer,
  Barometer,
  Gyroscope,
  Magnetometer,
  Pedometer,
  DeviceMotion
} from 'expo-sensors';
import { Compass } from './Compass'
import { Sensor, Bar } from './Sensors'


// expo install expo-speech
// expo install expo-sensors
// expo install react-native-svg



export default class App extends  React.Component{
  state = {steps: 0, 
          deviceMotion: null,
          stepsAvailable: null,
          motionAvailable: null,
          interval: 1000
        }

  say = () => {
    Speech.speak("hello there!")
  }

  subscribePedometer = async () => {
    const available = await Pedometer.isAvailableAsync();
    if (available) {
        this.stepsub = Pedometer.watchStepCount(this.saySteps)
    }
    this.setState({stepsAvailable: available});
  }
  
  subscribeMotion = async () => {
    const available = await DeviceMotion.isAvailableAsync();
    if (available) {
      this.motionSub = DeviceMotion.addListener(this.deviceMotion)
      DeviceMotion.setUpdateInterval(this.state.interval)
    }
    this.setState({motionAvailable: available})
  }

  saySteps = result => {
    const diff = result.steps - this.state.steps;
    if (diff > 0) {
      //Speech.speak("" + diff + " steps!")
      Speech.speak("" + result.steps)
    }
    this.setState({steps: result.steps});
  }


  deviceMotion = data => {
    const speed = Math.abs(data.acceleration.x) 
      + Math.abs(data.acceleration.y) 
      + Math.abs(data.acceleration.z)
    if (speed > 4 && speed <= 8) {
      Speech.speak("slow", {pitch: 0.2 * speed})
    } else if (speed > 8 && speed < 12) {
      Speech.speak("normal") //, {pitch: 0.2 * speed})
    } else if (speed > 10) {
      Speech.speak("fast", {pitch: 0.12 * speed})
    }
    this.setState({deviceMotion: data})
  }

  

  subscribeAll = () => {
    this.subscribePedometer()
    this.subscribeMotion()
  }

  removeAll = () => {
    this.stepsub && this.stepsub.remove()
    this.stepsub = null

    this.motionSub && this.motionSub.remove()
    this.motionSub = null

  }

  componentWillUnmount() {
    this.removeAll()
  }


  renderAccelerometer = data => {
      return (<View>
        <Bar color="yellow" value={data.x} max={1} />
        <Bar color="blue" value={data.y} max={1}  />
        <Bar color="red" value={data.z} max={1} />
      </View>)
  }

  renderMagnetometer = data => {
    return (<View>
      <Bar color="yellow" value={data.x} max={60} />
      <Bar color="blue" value={data.y} max={60} />
      <Bar color="red" value={data.z} max={60}/>
    </View>)
  }

  renderGyroscope = data => {
    return (<View>
      <Bar color="yellow" value={data.x} max={10} />
      <Bar color="blue" value={data.y} max={10} />
      <Bar color="red" value={data.z} max={10} />
    </View>)
  }

  renderDeviceMotion = data => {
    return (<View>
        <Text>Acceleration:</Text>
        <Bar color="yellow" value={data.acceleration.x} max={10} />
        <Bar color="yellow" value={data.acceleration.y} max={10} />
        <Bar color="yellow" value={data.acceleration.z} max={10} />
        <Text>Acceleration/Gravity:</Text>
        <Bar color="green" value={data.accelerationIncludingGravity.x} max={10} />
        <Bar color="green" value={data.accelerationIncludingGravity.y} max={10} />
        <Bar color="green" value={data.accelerationIncludingGravity.z} max={10} />
        <Text>Rotation:</Text>
        <Bar color="blue" value={data.rotation.alpha} max={10} />
        <Bar color="blue" value={data.rotation.beta} max={10} />
        <Bar color="blue" value={data.rotation.gamma} max={10} />
        <Text>Rotation Rate:</Text>
        <Bar color="red" value={data.rotationRate.alpha} max={10} />
        <Bar color="red" value={data.rotationRate.beta} max={10} />
        <Bar color="red" value={data.rotationRate.gamma} max={10} />
        <Text>Orientation:</Text>
        <Bar color="gray" value={data.orientation} max={180} />
    </View>)
  }

  renderPedometer = data => {
    return <Bar color="green" value={data.steps} max={100} />
  }

  render() {

  return (
    <View style={styles.container}>
    
      <Button title="hello there" onPress={() => this.say()} />
      <Button title="sub there" onPress={() => this.subscribeAll()} />
      <Button title="unsub there" onPress={() => this.removeAll()} />

      <Text>Steps = {"" + this.state.steps}</Text>
    
      <Sensor sensor={Accelerometer} type="Accelerometer" interval={125} renderData={this.renderAccelerometer}/>
      <Sensor sensor={Magnetometer} type="Magnetometer" interval={125} renderData={this.renderMagnetometer}/>
      <Sensor sensor={Pedometer} type="Pedometer" setupListener={listener => Pedometer.watchStepCount(listener)} renderData={this.renderPedometer}/>
      <Sensor sensor={Gyroscope} type="Gyroscope" interval={125} renderData={this.renderGyroscope}/>
      <Sensor sensor={DeviceMotion} type="Device Motion" interval={250} renderData={this.renderDeviceMotion}/>
      <Compass size={300}/>

    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


