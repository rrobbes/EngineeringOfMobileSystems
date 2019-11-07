# Navigation in the Contacts app

Now, we want to integrate navigation in the Contact management app. Specifically, we want to:
- Separate the application's functionality in several screens, while minimizing the changes to existing component. We will use navigation to switch between screens.
- Manage how components now separated in screens can communicate with each other and transmit information.

In terms of different screens we would like the application to have:
- A screen to display the list of contacts, with an option to add a new contact.
- Adding the new contact should be done in a new screen. When the data is submitted, the contact should be added to the state, and the contact list screen should show.
- The contact list should also support tapping on a contact to show its details, which would be in a separate screen.
- The app would also feature a login screen that is shown at the start.
- While showing the main screen (the contact list), the app should also allow the option to go to a settings screen, where various other options could be shown.

All in all, the app would have 5 different screens by the end.

## Screen components

While adding navigation is very useful, to extend the application, we don't want to reduce the reusability of the components. If we have a component that directly uses navigation, this means that it can not be reused in another context, where navigation is not available, or the navigation possibilities are different.

In short, we would like our application to support navigation but have our main ui components be unaware that navigation is used. How can we do this?

The answer is to use **screen components**. Screen components are used only to deal with the complexity of navigating between screens, and fetching data from other screens, or sending data to them. They isolate the presence of navigation from the other component.

In React Native, components receive information from their parents throught their props. As long as their parent sends them the right information, they "don't care" what kind of component the parent is. 

With screen components, each screen of the application is a tree of UI components, as before. But only the root component of the tree has knowledge of the navigation. This component can:
- Fetch data from the navigator, through screenProps or parameters, and pass this data to its children as regular props.
- Define the navigation operations that may be needed (navigating to other screens, going back, etc).
- Hide these navigation operations inside callbacks. These callbacks can then be passed to the components as regular props, as we did before.

The screen component should have no or very little actual functionality. Its only role is to act as a "translator" between the navigator and the normal components

## Callbacks between screens

What can we do when have the following scenario?
- A first component (e.g. the contact list), triggers navigation to a second component (e.g, the "add contact" component).
- The second component gather data with, for example, a form, and wants to "send it back" to the previous components.
- The initial components changes its state due to the new information (e.g., adding the new contact)

Earlier, we managed state in a parent component, wich would pass callbacks to the child components. For instance, our main App component was doing this:

```javascript
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
```


To do callbacks between screens, each screen will receive the original callbacks, instead of the components. Each screen will define new callbacks, that will execute the original callbacks, and also execute the necessary navigation operations.

The new version of the app, suporting navigation, passes those callbacks through screenProps:

```javascript
render(){
		return (
			<AppContainer screenProps={{
				contacts: this.state.contacts,
				addContact: this.addContact
			}}/>
		)
    }
```

And the screens wrap the navigation operations so that the original components are not affected. For the ContactList:

```javascript
const ContactListScreen = props => {
    return (
    <View  style={styles.container}>
        <ContactList 
            contacts={props.screenProps.contacts}
        />
    </View>
    )
}
```

For the AddContact component:

```javascript
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
```

Operating in this way, the two Components **do not need to know that anything changed**. They can be used as they were used before. Only the screens have to be changed.

## Refactoring to use Screens

A convention is to define screen components in a `screens` subdirectory of the source code. These components import the original UI components, and act as the interface with the navigation.

Then, the main application would define the top-level state, the navigators and their routes. It would then pass the top-level state  and callbacks to the navigators as screenProps.

If done right, the children components themselves should not need to change.

Refactoring the code to use screens and navigators adds quite a bit of complexity to an app. However, this structure is how we can grow our application, and make it more complex over time. There will be a clear way to add new screens, without adding and managing new state in the app.