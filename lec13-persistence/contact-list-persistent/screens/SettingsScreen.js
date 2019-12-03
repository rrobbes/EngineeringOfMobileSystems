import React from 'react'
import {View, Text, Button} from 'react-native'
import styles from '../style'

const SettingsScreen = props => (
    <View  style={styles.container}>
        <Button title="Logout" onPress={() => props.navigation.navigate("Login")}/>
    </View>)
SettingsScreen.navigationOptions = {title: "Settings"}

export default SettingsScreen