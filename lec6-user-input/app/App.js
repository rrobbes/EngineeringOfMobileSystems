import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList } from 'react-native';
import {contacts, newRandomKey} from './contacts'
import Constants from 'expo-constants'
import ContactList from './ContactList'
import AddContact from './AddContact'

 

export default class ContactApp extends React.Component {

  state = {
    contacts: contacts,
    showContacts: true,
  }

  toggleContacts = () => {
    this.setState(prev => ({showContacts: !prev.showContacts}))
  }

  addContact = newContact => {
    const contactWithKey = {...newContact, key: newRandomKey()}
    this.setState(prev => ({contacts: [...prev.contacts, contactWithKey], showContacts: true})) 
  }

  render() {

  return (
    <View  style={styles.container}>
      <Button 
          title="Enter New Contact" 
          onPress={this.toggleContacts}/>
        {this.state.showContacts?
          <ContactList contacts={this.state.contacts}/>:
          <AddContact onSubmit={this.addContact}/>}
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});