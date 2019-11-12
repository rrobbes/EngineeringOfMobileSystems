import React from 'react'
import {View} from 'react-native'
import AddContact from '../AddContact'
import styles from '../style'


const AddContactScreen = props => {
    const onSubmit = contact => {
        console.log(props.screenProps)
        props.screenProps.addContact(contact)
        props.navigation.navigate("ContactList")
    } 

    return (
        <View style={styles.container}>
            <AddContact onSubmit={onSubmit} />
        </View>
    )
}

AddContactScreen.navigationOptions = {title: "Add Contact"}


export default AddContactScreen