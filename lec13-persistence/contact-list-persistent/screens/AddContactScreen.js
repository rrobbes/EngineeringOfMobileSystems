import React from 'react'
import {View} from 'react-native'
import AddContact from '../AddContact'
import {Subscribe} from 'unstated'
import ContactContainer from '../ContactContainer'
import styles from '../style'


const AddContactScreen = props => {
    const onSubmit = (contact, container) => {
        container.addContact(contact)
        props.navigation.navigate("ContactList")
    } 

    return (
        <Subscribe to={[ContactContainer]}>{
            container => 
                (<View style={styles.container}>
                    <AddContact onSubmit={contact => onSubmit(contact, container)} />
                </View>)
        }</Subscribe>
    )
}

AddContactScreen.navigationOptions = {title: "Add Contact"}


export default AddContactScreen