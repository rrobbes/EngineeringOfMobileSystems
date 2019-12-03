import React from 'react'
import {View, Button} from 'react-native'
import ContactList from '../ContactList'
import {Subscribe} from 'unstated'
import ContactContainer from '../ContactContainer'
import styles from '../style'

const ContactListScreen = props => {
    return (
    <Subscribe to={[ContactContainer]}>{
        contacts => 
        (<View  style={styles.container}>
            <ContactList 
                contacts={contacts.state.contacts}
                onSelect={contact => {
                    props.navigation.navigate("ContactDetails", {selectedContact: contact})
                    }}/>
        </View>)
        }
    </Subscribe>
    )
}

ContactListScreen.navigationOptions = ({navigation}) => ({
    title: "Contacts",
    headerRight:  <Button 
    title="Add Contact" 
    onPress={() => navigation.navigate("AddContact")}/>
})

export default ContactListScreen