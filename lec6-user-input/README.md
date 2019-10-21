
# User Input

In this lesson we talk about how to handle input, and how to validate it.  This class is based in part on [CS50 Lecture 4 and 5](https://video.cs50.net/mobile/2018/spring/lectures/4).

## Adding contacts 

How de we add a new contact? For this, we need new UI components, and to learn about a couple of new concepts. So, we create a new RN component, such as `AddContactForm` that can handle this task. In order to render the UI, we would need a few UI widgets, such as:
- One TextInput to enter the contact's name
- Another TextInput to enter the contact's phone number
- Possibly additional TextInputs for email, etc (omitted for simplicity)
- A button to actually add the contacts


The UI inside the render() method could look like so (ignoring styling issues):
```javascript
render() {
return 
    (<View>
    <TextInput value={this.state.name} onChangeText={this.handleNameChange}>
    <TextInput value={this.state.phone} onChangeText={this.handlePhoneChange}>
    <Button title="Add Contact" onPress={this.handleSubmit}>
    </View>)
}
```

In `App.js` we can use conditional rendering with a boolean state to show/hide the contact form.

## Controlled and Uncontrolled user input

There are two ways to handle user input: controlled vs uncontrolled user input.
The difference between these is where the source of truth for the input is. In other words, who is keeping track of the value of the input?

If we used controlled user input, the input is controlled by the framework, i.e., React. If we use uncontrolled user input, the input will be whatever the input widget contains.

React (and RN) recommends, and uses by default, controlled user input. It is easier to control the value of the input this way.

In practice, React gets called everytime the input changes, and gets a "veto right" over the input value: React gets to decide what the actual value should be. The value of the input mirrors an actual variable in the state of the component, and changes to it must be confirmed by React. If the state is not updated, the input component will be reset to the value that the state contains.

Concretely, a `<TextInput>` has an `onChangeText` callback, and a `value`, which tracks a variable in the state. If the change to the input is accepted, then `onChangeText` should call `setState` to set the state variable to the value of the input.


```javascript

handleNameChange = name => {
    this.setState({name: name}) 
} 

// ...

<TextInput value={this.state.name} onChangeText={this.handleNameChange}>
```

Notice that the TextInput reference a state variable. If `this.state.name` does not change, when the component is re-rendered, the text input will be automatically reset to the value that is in `this.state.name`.

## Adding contacts, and handling multiple input fields

Unlike in, for instance, a web form, there is no need to collect all the data before sending it to the application for processsing. This is because the application will always have the entered data in its state, thanks to the controlled components. 

So, when the form is submitted, we just need to gather the data that was sent, create a new contact object, and add it to the application's contact list. Who should handle actually adding the data? Probably not the form itself, but some higher-level component, such as our main component. A previous component should control this behaviour, via a prop passed to our add contact component. 

We define the Button's onPress prop to call our handleSubmit event handler, which itself passes pack control to its callback prop.

```javascript

<Button title="Add Contact", onPress={this.handleSubmit}>

// ...

handleSubmit = () => {
	this.props.onSubmit({name: this.state.name, phone: this.state.phone})
}
```

Given that the state of the component is only these two attributes, which correspond to the data the calling component expects, we could even do:

```javascript
<Button title="Add Contact", onPress="this.props.onSubmit(this.state)"/>
```

On the calling side, the callback prop passed to the `AddContactForm` component would be defined in `App.js`, and look like:

```javascript
addContact = newContact => {
	this.setState(prev => ({contacts: [...prev.contacts, newContact], showForm: false}))
}
```

Note the second attribute to show the application's main content and hide the form.

## Input Validation

The application does not do any input checking so far, which is problematic. Users can enter incorrect phone numbers, incorrect names, and so on. 

In the "controlled component" paradigm, there is a simple way to do input checking: only call `setState` if the input is correct. The event handler can include a conditional check for that, with `setState` called only in one of the branches. If setState is not called, the input will be reset to the last valid input.

For instance, if we want to enforce that the phone number is a valid number, and has 10 digits, we can use the following check:

```javascript
handlePhoneChange = phone => {
    if (+phone >= 0 && phone.length <= 10) {
		this.setState({phone: phone})
	}
}

// +"123" returns 123, allows to quickly check if a string is a number
```

This will allow the input to change as long as there are less than 10 digits in it, and if any new character is a digit.

We can also do a validation step of all the data in the form before submitting. For instance, we can ensure that the phone number is **exactly** 10 digits long, and that the name is long enough:

```javascript
handleSubmit = () => {
	if (+this.state.phone >= 0 
        && this.state.phone.length === 10 
        && this.state.name.length >= 3) {
	        this.props.onSubmit(this.state)
	}
}
```

To go one step further, we can enable/disable the "Add Contact" button to show when the input is valid. A `<Button />` can have a `disabled` prop, which is a boolean.

There are several ways to manage this `disabled` prop:
- When rendering, enable/disable the button based on a predicate executed at render time. The downside is that this will slow down the render: If the predicate is slow to execute, the UI will be blocked:
```javascript
 validateForm = () => { 
    return  +this.state.phone >= 0 && this.state.phone.length === 10 && this.state.name.length >= 3
}
//...
<Button disabled={!validateForm()} />
```
- Maintain the `disabled` status as part of the state. Each time the input changes, set the `disabled` status accordingly in the input form handler. This will be executed in the background, so the UI will be fine. But each input form handler will have to do this.
```javascript
validateForm = () => {
	if ( /* ... */) this.setState({isFormValid: true})
    else this.setState({isFormValid: false})
}
 // ...   
handleNameChange = name => this.setState({name: name}, this.validateForm)
// here we call the validateForm callback after setState executes
```
- Use the `componentDidUpdate` lifecycle method to set the `disabled` status after each state change. `componentDidUpdate` is called after **each state change**. So, this localizes the check of the state in one location. On the other hand, it's easy to have an infinite loop, since changing the `disabled` status also sets the state.
```javascript
componentDidUpdate(pProps, pState) {
	if (this.state.name !== pState.name || this.state.phone !== pState.phone) {
		this.validateForm()
	}
}
```

## Large forms on small screens

While it is not a good idea to have very large forms on mobile devices (too much work to fill them!), they are sometimes necessary. By default, it is possible these forms will be hidden by slide-in keyboards. A solution to this is to use the [KeyboardAvoidingView](https://docs.expo.io/versions/latest/react-native/keyboardavoidingview/) component.