import React from 'react'
import {View} from 'react-native'
import ContactDetails from '../ContactDetails'
import styles from '../style'

const ContactDetailScreen = props => (
    <View style={styles.container}>
        <ContactDetails 
                contact={props.navigation.getParam("selectedContact")}
                contacts={props.screenProps.contacts}
                onSelect={contact => props.navigation.push("ContactDetails", {selectedContact: contact})}/>
    </View>
)

ContactDetailScreen.navigationOptions = ({navigation }) => (
    {title: navigation.getParam("selectedContact").name})


export default ContactDetailScreen