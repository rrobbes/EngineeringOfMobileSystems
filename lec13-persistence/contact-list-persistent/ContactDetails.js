import React from 'react'
import {View, Button, Text} from 'react-native'
import {rand} from './contacts'

const ContactDetails = props => {
    const randomContact = () => props.contacts[rand(props.contacts.length - 1)]

   return (
    <View>
        <Text>{props.contact.name}</Text>
        <Text>{props.contact.phone}</Text>
        <Button title="Random Contact" 
                onPress={() => props.onSelect(randomContact())} />
        <Button title="Delete Contact"
                onPress={() => props.onDelete(props.contact)} />
    </View>)
}

export default ContactDetails

