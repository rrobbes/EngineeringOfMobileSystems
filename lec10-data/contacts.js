const NUM_CONTACTS = 5

const firstNames = [
  'Emma',
  'Noah',
  'Olivia',
  'Liam',
  'Ava',
  'William',
  'Sophia',
  'Mason',
  'Isabella',
  'James',
  'Mia',
  'Benjamin',
  'Charlotte',
  'Jacob',
  'Abigail',
  'Michael',
  'Emily',
  'Elijah',
  'Harper',
  'Ethan',
  'Amelia',
  'Alexander',
  'Evelyn',
  'Oliver',
  'Elizabeth',
  'Daniel',
  'Sofia',
  'Lucas',
  'Madison',
  'Matthew',
  'Avery',
  'Aiden',
  'Ella',
  'Jackson',
  'Scarlett',
  'Logan',
  'Grace',
  'David',
  'Chloe',
  'Joseph',
  'Victoria',
  'Samuel',
  'Riley',
  'Henry',
  'Aria',
  'Owen',
  'Lily',
  'Sebastian',
  'Aubrey',
  'Gabriel',
  'Zoey',
  'Carter',
  'Penelope',
  'Jayden',
  'Lillian',
  'John',
  'Addison',
  'Luke',
  'Layla',
  'Anthony',
  'Natalie',
  'Isaac',
  'Camila',
  'Dylan',
  'Hannah',
  'Wyatt',
  'Brooklyn',
  'Andrew',
  'Zoe',
  'Joshua',
  'Nora',
  'Christopher',
  'Leah',
  'Grayson',
  'Savannah',
  'Jack',
  'Audrey',
  'Julian',
  'Claire',
  'Ryan',
  'Eleanor',
  'Jaxon',
  'Skylar',
  'Levi',
  'Ellie',
  'Nathan',
  'Samantha',
  'Caleb',
  'Stella',
  'Hunter',
  'Paisley',
  'Christian',
  'Violet',
  'Isaiah',
  'Mila',
  'Thomas',
  'Allison',
  'Aaron',
  'Alexa',
  'Lincoln',
]

const lastNames = [
  'Smith',
  'Jones',
  'Brown',
  'Johnson',
  'Williams',
  'Miller',
  'Taylor',
  'Wilson',
  'Davis',
  'White',
  'Clark',
  'Hall',
  'Thomas',
  'Thompson',
  'Moore',
  'Hill',
  'Walker',
  'Anderson',
  'Wright',
  'Martin',
  'Wood',
  'Allen',
  'Robinson',
  'Lewis',
  'Scott',
  'Young',
  'Jackson',
  'Adams',
  'Tryniski',
  'Green',
  'Evans',
  'King',
  'Baker',
  'John',
  'Harris',
  'Roberts',
  'Campbell',
  'James',
  'Stewart',
  'Lee',
  'County',
  'Turner',
  'Parker',
  'Cook',
  'Mc',
  'Edwards',
  'Morris',
  'Mitchell',
  'Bell',
  'Ward',
  'Watson',
  'Morgan',
  'Davies',
  'Cooper',
  'Phillips',
  'Rogers',
  'Gray',
  'Hughes',
  'Harrison',
  'Carter',
  'Murphy',
]

// generate a random number between min and max
export const rand = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

// generate a name
const generateName = () =>
  `${firstNames[rand(firstNames.length - 1)]} ${lastNames[rand(lastNames.length - 1)]}`

// generate a phone number
const generatePhoneNumber = () => `${rand(999, 100)}-${rand(999, 100)}-${rand(9999, 1000)}`

// create a person
const createContact = () => ({
  name: generateName(),
  phone: generatePhoneNumber(),
})

// Compare two contacts using the lexicographical order (a < b).
// If the list is sorted, the contacts will be in alphabetical order.
export const compareNames = (contact1, contact2) => contact1.name > contact2.name

// add keys to based on index
// the function given to map, when it has two parameters, gets the index as the second parameter
// we use the index as a unique key
const addKeys = (val, index) => ({key: `${index}`, ...val})
// for a shorter version:
// const addKeys = (val, key) => ({key, ...val})

// create an array of length NUM_CONTACTS and add keys
export const contacts =  Array.from({length: NUM_CONTACTS}, createContact).map(addKeys)
export const newRandomKey = () => rand(1000000000)

export const getContacts = async () => {
    const response = await fetch("http://randomuser.me/api/?results=5000")
    const theContacts = await response.json()
    const convertedContacts = theContacts.results.map(apiContact => {
        return {
            name: `${apiContact.name.first} ${apiContact.name.last}`, 
            phone: apiContact.phone}
    })
    return convertedContacts
}