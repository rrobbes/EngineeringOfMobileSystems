import React from 'react'
import {View} from 'react-native'
import ContactDetails from '../ContactDetails'
import {Subscribe} from 'unstated'
import ContactContainer from '../ContactContainer'
import styles from '../style'

const ContactDetailScreen = props => (
    <Subscribe to={[ContactContainer]}>{
        container => (
            <View style={styles.container}>
                <ContactDetails 
                    contact={props.navigation.getParam("selectedContact")}
                    contacts={container.getContacts()}
                    onSelect={contact => props.navigation.push(
                                            "ContactDetails", 
                                            {selectedContact: contact})}
                    onDelete={contact => {
                        container.deleteContact(contact)
                        props.navigation.goBack()
                    }} />
            </View>)}
    </Subscribe>
)

ContactDetailScreen.navigationOptions = ({navigation }) => (
    {title: navigation.getParam("selectedContact").name})


export default ContactDetailScreen