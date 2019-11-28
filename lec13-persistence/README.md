# State Management, Memory, and Persistence

## State Management in the Contact app

We start by using the state management library Unstated (see previous lecture) in the Contacts App. This allows us to create a new module that encapsulates all the contact management operations in a single place, the Contact Container. The container will be handle all aspects of the contact state, such as adding contacts, or fetching contacts from the web service API.

After this, the Top-level of the application (App.js) essentially only deals with navigation. The Screen components can be modified to also use Unstated, instead of passing data through screenProps or params. **Note that not all usages of navigation params should necessarily be converted to Unstated**. For instance, it is possible to select a contact, and show its details. This operations opens a new screen, but it is not necessarily a good idea to add a "selected contact" state to the Contact Container. This operation may be purely at the level of the UI, and the concept of selecting a contact may not be relevant to the overall state of the application.

Note that after modifying the application in this way, it becomes easier to add new operations that operate on the state. For instance, the Contact Details screen could offer the option to delete a contact. Doing so before would have involved changing the top-level app to create a callback to delete a contact, and pass it to all the screens as a ScreenProp. With a Container, we can only pass it to the relevant Screen (ContactDetailsScreen), and the component.

## Memory in mobile OSes, and implications

Mobile devices have a relatively limited amount of storage, memory, and battery. While this is not as true today, it was very important in the beginning, and had important constraints in the design of mobile OSes. In particular, neither Android or iOS have **swap space**. 

Desktop OSes have swap space: when the applications need to much resources, the OS can decide to move some of their memory to swap space (essentially, dumping the memory contents on the hard disk), to free some RAM for other applications. This allows to keep a lot of applications open at the same time, at the cost of slowdowns when applications that were swapped out of memory are re-activated.

In mobile, this does not work since both storages are constrained. Moreover, writing and reading large quantitie of data from permanent storage (e.g., the memory of an entire process, which can be hundreds of megabytes) regularly would be harmful for the battery life.

Thus, mobile OSes have a different way of handling memory resource issues. When memory runs low, **they can terminate applications**. You may have noticed when multitasking that occasionally, applications appear to relaunch, not resume the execution. Essentially, **your application may be terminated by the OS at any time**, particularly when it is inactive. 

When an application is inactive, goes into the background, or is about to be terminated, the OS will notify the application. The application can respond by saving its most essential state, so that it can resume execution when relaunched. In this case, it is a responsability of the mobile app developer to:
- Determine what is the smallest amount of state that is necessary for the app to relaunch
- Make sure that this smallest amount of state is persisted when it should

An additional advantage of this strategy for the OS, is that it forces developers to choose the state they want to persist. This results in much smaller space demands than swapping, that needs to write down to disk possibly the entire process space of an application. An application that needs hundreds of megabytes of RAM may acctually have a state, that, when explicitely persisted, takes a few hundreds of kilobytes only. 

For instance, in the contact app, if we wanted to "save" a list of 1,000,000 randomly generated contacts (I know, this is absurd!), we don't need to actually save them. The only information we would need to save is the random seed that was used to generate the random contacts. We can go from several megabytes to just a few bytes.

## AppState

A good moment to persist important data from your App is when it becomes inactive. The OS normally does not usually terminates the active application; rather it will usually terminate inactive applications in the background to free RAM for the active application. The React Native library AppState can be used to receive notifications of when the App goes in the background and foreground, through callbacks. 

[See the documentation on AppState](https://facebook.github.io/react-native/docs/appstate#app-states)

Note that beyond persistence, knowing when the app is in the background can be useful to adjust it's behaviour. For instance, the app may turn off or reduce other callbacks while it is in the background. For instance:
- the app won't need detailed location data if it is in the background
- the user don't need to see up-to-date information if they may not even read it. So an app that consults a web service for incoming data may stop doing it, or do it less frequently
- on the other hand, the app may want to disply user notifications if important events occurs while it is in the background

## Persistence

There are several solutions to persist data. The Expo API offers a variety of basic mechanisms. Of note, many of these functionalities are available through **async** methods. 

### FileSystem

[See the documentation](https://docs.expo.io/versions/latest/sdk/filesystem/). Every app can access a local file system, that is visible only to the app itself, and not from the outside. Every app has access to a specific set of directories, where it can read and write files:
- `FileSystem.documentDirectory`:  `file://` URI pointing to the directory where user documents for this app will be stored. Files stored here will remain until explicitly deleted by the app. Ends with a trailing /. Example uses are for files the user saves that they expect to see again.
- `FileSystem.cacheDirectory`: `file://` URI pointing to the directory where temporary files used by this app will be stored. **Files stored here may be automatically deleted by the system when low on storage**. Example uses are for downloaded or generated files that the app just needs for one-time usage.

In addition, other directories in the OS can be accessed read-only. For instance, if the app has permission to access the camera roll, it can read files from that specific directory. See [The Camera Roll documentation](https://facebook.github.io/react-native/docs/cameraroll.html#getphotos) for more on this.

### SQLite

[See the documentation](https://docs.expo.io/versions/latest/sdk/sqlite/). 
A lightweight, filesystem-based implementation of an SQL database. It allows to create, access, and alter SQL tables, using the SQL language. The database will be created in the app's document directory, e.g. `${FileSystem.documentDirectory}/SQLite/${name}`.

Several databases can be created if needed. A `Database` object represents a connection to the DB, and `Transaction`s can be created to consult the DB, by interpreting SQL statements (defined in strings). The `Transaction` may return a `ResultSet` object. 

### AsyncStorage

[See the documentation](https://docs.expo.io/versions/latest/react-native/asyncstorage/)
A simple key-value store (e.g., to store JSON objects) that is global to the app. Note that it is not encrypted. See [SecureStore](https://docs.expo.io/versions/latest/sdk/securestore/) if you need to store sensitive data. The library is meant to be a drop-in replacement to the localStorage API available in web browsers.

AsyncStorage is the simplest way to store state that is encoded as small objects. Very large objects, or binary objects (e.g. images) should rather be stored in the file system, with the URI to the file stored in AsyncStorage (or SQLite). 

The API of AsyncStorage is very simple: several variants of `get` and `set` methods that take a string as key. Since the key-value store is global, it is easy to overwrite a given key with another, if two parts of the app use the same string as a key. This is why, beyond simple usages, the API recommends to use an abstraction layer on top of AsyncStorage, rather than AsyncStorage library. 

For instance, state management APIs such as Redux, or Mobx can use AsyncStorage as a backend to persist their stores from one session to the next.

### Persisting the Contacts App

Persisting the Contacts App is actually very simple. An add-on to unstated, `unstated-persist`, allows to easily store Containers in AsyncStorage, and load them again when the app launches. [See unstated-persist on GitHub](https://github.com/rt2zz/unstated-persist), and install it with `expo install unstated-persist`.

Using unstated-persist, a Container will be automatically read from disk when the app launches. Moreover, the subscription mechanism can be use to automatically persist the Container whenever it changes. Note that an application with large amounts of data or rapidly changing data may want to do things differently, as this could hurt performance. The first step would probably be to split the state in several Containers, so that not all the state is saved whenever a tiny part of it changes. Furthermore, some containers may instead be saved only when the app goes into the background, not everytime they change.

### Persisting Navigation
Another possible addition would be to also store in the state in which screen the application is, so that the user restarts from the exact point they were in. This is not done here, but it is doable. There are examples of this for other frameworks:
- [React Navigation and AsyncStorage](https://reactnavigation.org/docs/en/state-persistence.html)
- [Redux and React Navigation](https://reactnavigation.org/docs/en/redux-integration.html)
- [Mobx-State-Tree and React Navigation](https://reactnavigation.org/docs/en/MST-integration.html)

A similar solution for unstated should be possible, or AsyncStorage with `persistNavigationState` and `loadNavigationState` navigator props can just be used.

## State evolution and updates

There is another limitation to unstated-persist: it does not handle state evolution. If your app is succesful, it is likely that you will want to update it over time. When adding new features, it is possible that you will need to change the data format. For the contact app, we could think of the following changes:
- In version 2, contacts have a profile picture, which is a new property with the url of the image
- In version 3, the phone number changes to `{phone: {prefix: "+39", number: "1234567"}}`
- In version 4, emails are added, and names are changed to: `{name: {first: "james", last: "bond", title: "Mr."}}`

Users that upgrade are at risk of losing data if this is not handled properly. To make matters worse, there is no guarantee that users will install all the updates! It is possible that some users will upgrade directly from version 1 to version 4, or go from any older version to the latest version.

Unstated-persist allows each container to specify the version of the application that it was saved in. This allows to detect version mismatches.
The naive approach is to erase the data and start over, but that is of course very unsatisfactory. This is what unstated-persist does.

Fortunately, solutions exist. A possible solution is to call a "migration method" when a version mismatch is detected. There is actually a rather elegant pattern to handle version migrations from an arbitrary starting point, using, of all things, a switch statement:

```javascript
migrate = (state, oldVersion) => {
        let newState = state
        switch (oldVersion) {
            case 1: 
                console.log("migrating from 1 to 2, adding default pictures")
                newState.contacts = newState.contacts.map(c => ({...c, picture: defaultPicture}))
            case 2:
                console.log("migrating from 2 to 3, restructuring phone numbers")
                newState.contacts = newState.contacts.map(c => ({...c, phone: {prefix: "+39", number: c.phone}}))
            case 3:
                console.log("migrating from 3 to 4, restructuring and adding emails")
                newState.contacts = newState.contacts.map(c => ({...c, name: convertName(c.name), email: "update.me@please.com"}))
        }
        return newState
        
    }
```

The "beauty" of this switch statement is that it is **not using break**, so that the code will execute the next blocks too. This way, a user that is on version 1 will execute all the code in the method, performing the 3 conversion steps, while someone that is on version 3 will only execute the last block.


