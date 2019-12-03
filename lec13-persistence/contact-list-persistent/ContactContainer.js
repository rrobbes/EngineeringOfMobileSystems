// import {Container} from 'unstated'
// import {PersistContainer} from 'unstated-persist'
// we use unstated-persist, but a modified version that handles init and migration
import {PersistContainer} from './mypersist'
import {newRandomKey, getContacts} from './contacts'
import {AsyncStorage} from 'react-native'


export default class ContactContainer extends PersistContainer {

    constructor(props) {
        super(props)
        this.state = {
    	    contacts: [],
        }


        //this.fetchContacts()
    }
	 
	fetchContacts = async () => {
		const contacts = await getContacts()
		this.setState({contacts: contacts})
    }

    getContacts = () => this.state.contacts

    deleteContact = contact => {
        const newContacts = this.state.contacts.filter(c => c !== contact)
        this.setState({contacts: newContacts})
    }
    

	addContact = newContact => {
		const contactWithKey = {...newContact, key: newRandomKey()}
		this.setState(prev => ({contacts: [...prev.contacts, contactWithKey]})) 
    }
    
    // if no data, fetch some from the internet
    persist = {
        key: 'contacts',
        version: 4,
        storage: AsyncStorage,
        init: this.fetchContacts,
        migrate: this.migrate
    }

    // handles migration from version 1 up to version 4, step by step
    migrate = (state, oldVersion) => {
        let newState = state
        switch (oldVersion) {
            case 1:
                console.log("migrating from 1 to 2")
                const defaultURL = "a reasonable default"
                // all contacts get an "image" field
                newState.contacts = newState.contacts.map(c => ({...c, image: defaultURL}))
            case 2:
                console.log("migrating from 2 to 3")
                // adding phone prefixes, default is italian prefix
                newState.contacts = newState.contacts.map(c => ({...c, phone: "+39" + c.phone}))
            case 3:
                console.log("migrating from 3 to 4")
                // changing something with name format
                newState.contacts = newState.contacts.map(c => ({...c, name: c.name + " v4"}))
        }
        return newState
    }


}