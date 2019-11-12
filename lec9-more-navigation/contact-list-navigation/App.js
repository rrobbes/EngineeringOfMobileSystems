import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AddContactScreen from './screens/AddContactScreen'
import ContactListScreen from './screens/ContactListScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import SettingsScreen from './screens/SettingsScreen'
import LoginScreen from './screens/LoginScreen'

import {contacts, newRandomKey} from './contacts'


const stackRoutes = {
	AddContact: AddContactScreen,
	ContactList: ContactListScreen,
	ContactDetails: ContactDetailsScreen
}
const stackOptions = {
	initialRouteName: 'ContactList'
}
const StackNavigator = createStackNavigator(stackRoutes, stackOptions)

const getIcon = (name, focused, tint) => {
	const color = focused?tint:"grey"
	return <Ionicons name={name} size={25} color={color} />
}

const tabRoutes = {
	Contacts: StackNavigator,
	Settings: SettingsScreen,
}
StackNavigator.navigationOptions = {
	tabBarIcon: ({focused, tint}) => getIcon("ios-contacts", focused, tint),
}
SettingsScreen.navigationOptions = {
	tabBarIcon: ({focused, tint}) => getIcon("ios-settings", focused, tint),
}
const TabNavigator = createBottomTabNavigator(tabRoutes)

const switchRoutes = {
	Login: LoginScreen,
	Main: TabNavigator
}
const switchOptions = {
	initialRouteName: 'Login'
}
const AppNavigator = createSwitchNavigator(switchRoutes, switchOptions)

const AppContainer = createAppContainer(AppNavigator)

export default class ContactApp extends React.Component {

  	state = {
    	contacts: contacts,
 	}

	addContact = newContact => {
		const contactWithKey = {...newContact, key: newRandomKey()}
		this.setState(prev => ({contacts: [...prev.contacts, contactWithKey]})) 
	}

	render(){
		return (
			<AppContainer screenProps={{
				contacts: this.state.contacts,
				addContact: this.addContact
			}}/>
		)
	}
}
