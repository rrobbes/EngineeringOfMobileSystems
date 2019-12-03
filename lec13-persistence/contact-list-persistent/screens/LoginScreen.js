import React from 'react';
import {View, Button} from 'react-native';
import styles from '../style'

const LoginScreen = props => (
    <View style={styles.container}>
        <Button title="press to login" onPress={() => props.navigation.navigate("Contacts")} />
    </View>
    )

export default LoginScreen