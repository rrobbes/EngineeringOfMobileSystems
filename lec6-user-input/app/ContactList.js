import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, FlatList, SectionList } from 'react-native';



// styles for the components in this file
const styles = StyleSheet.create({
    contact: {marginLeft: 55, margin: 10},
    header: {
        fontSize: 24, 
        fontWeight: 'bold',
        paddingTop: 30,
        margin: 25
    }
})

// the key property is passed to the Contact component itself
// not the <View> inside it!
const Contact = props =>  
  (<View style={styles.contact}> 
      <Text>{props.name}</Text>
      <Text>{props.phone}</Text>
</View>)

// The component displaying the list visually
const ContactList = props => {
    
    initialSections= {}

    // here we sort contacts in "buckets" corresponding to their first letter
    // the result is an object: {A: [...], B: [...], C: [...]}
    const contactsByLetter = props.contacts.reduce((sections, contact) => {
        const firstLetter = contact.name[0].toUpperCase()
        const sectionContacts = sections[firstLetter] || []
        const newSection = [...sectionContacts, contact]
        return {
            ...sections,
            [firstLetter]: newSection
        }
    }, initialSections)

    // here we convert the object {A: [...], B: [...], C: [...]} to the form:
    // [{title: 'A', data: [...]}, {title: 'B', data: [...]}, {title: 'C', data: [...]}]
    const objectAsSections = Object.keys(contactsByLetter).sort().map(letter => (
    {
        title: letter,
        data: contactsByLetter[letter],
    }))

    const renderHeader = header => (
        <Text style={styles.header}>
            {header.section.title}
        </Text>
    )

    const renderItem = object => (<Contact {...object.item}/>)

    return (
        <SectionList
            sections = {objectAsSections}
            renderSectionHeader = {renderHeader}
            renderItem = {renderItem} 
    />)
}

export default ContactList
