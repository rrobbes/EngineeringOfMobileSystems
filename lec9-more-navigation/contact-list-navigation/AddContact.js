import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

const styles = StyleSheet.create({
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        margin: 20
    }
})

export default class AddContact extends React.Component {

    // this is a shorthand way of writing a constructor when we only have state
    state = {
        name: '',
        phone: '', 
        isValid: false
    }

    // here we use the post-setState callback to determine whether the form is valid
    handleNameChange = name => {
        this.setState({name: name}, this.validateForm)
    }

    handlePhoneChange = phone => {
        if ( +phone >= 0 && phone.length <= 10)
            this.setState({phone: phone}, this.validateForm)
    }

    validateForm = () => {
        const formValid = (+this.state.phone >= 0 
            && this.state.phone.length === 10 
            && this.state.name.length >= 3)
        this.setState({isValid: formValid})  
    }

    handleSubmit = () => {
        this.props.onSubmit({name: this.state.name, phone: this.state.phone})
    }

    render() {
        return (
            <View>
                <TextInput 
                        style={styles.input} 
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                        />
                <TextInput 
                        style={styles.input} 
                        value={this.state.phone}
                        onChangeText={this.handlePhoneChange} />
                <Button 
                        title="Add Contact"
                        onPress={this.handleSubmit}
                        disabled={!this.state.isValid}
                     />
            </View>
        )
    }

}
