import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList } from 'react-native';
import {contacts, newRandomKey} from './contacts'
import Constants from 'expo-constants'
import ContactList from './ContactList'
import AddContact from './AddContact'

  

export default class ContactApp extends React.Component {

	// this is a shorthand way of writing a constructor when we only have state
	// there is a standard constructor here:
	// https://github.com/rrobbes/EngineeringOfMobileSystems/blob/master/lec4-ReactNative/todo-rn.js
  	state = {
    	contacts: contacts,
    	showContacts: true,
 	}

	// we define the callbacks using the arrow syntax here
	// before, we were creating them in the onPress props:
	// https://github.com/rrobbes/EngineeringOfMobileSystems/blob/master/lec4-ReactNative/todo-rn.js
	// the advantage of this way is that we create the arrow function once
	// the way we did before, a new arrow function was created each time
	// an object was rendered
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