import React from 'react'
import {View, Button} from 'react-native'
import ContactList from '../ContactList'
import styles from '../style'

const ContactListScreen = props => {
    return (
    <View  style={styles.container}>
        <ContactList 
            contacts={props.screenProps.contacts}
            onSelect={contact => {
                props.navigation.navigate("ContactDetails", {selectedContact: contact})
                }}/>
    </View>
    )
}

ContactListScreen.navigationOptions = ({navigation}) => ({
    title: "Contacts",
    headerRight:  <Button 
    title="Add Contact" 
    onPress={() => navigation.navigate("AddContact")}/>
})

export default ContactListScreen