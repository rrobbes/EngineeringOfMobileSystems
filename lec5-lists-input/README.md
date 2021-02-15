# Expo, Scrolling, and Lists

In this class we start our first "real" (i.e., using multiple files) application, using the tools that we will use for the whole semester. This class is based in part on [CS50 Lecture 4](https://video.cs50.net/mobile/2018/spring/lectures/4).

## Expo

First things first: open your mobile device's App Store, and search for the Expo app. Install it.

Expo is a framework built on top of React Native. It does a few things for you:

First, Expo abstracts away the complexity of compiling and deploying the native applications. This is usually done with XCode or Android Studio. A native application needs to be redeployed to a device of emulator whenever you want to test it. Expo offers an easier solution: the mobile device or simulator runs the Expo app, while the development machine runs a suite of development tools. Both communicate through a network connection. Whenever the source code changes, the development tools can notify Expo through the connection, and send it the files that changed. They will then be recompiled and re-executed in the app, which allows for a quick turnaround of the changes. Occasionaly, this may fail and all the code needs to be redownloaded, which is slower (a few seconds). But this is still much faster than recompiling a native app.

Second, Expo provides additional APIs on top of the ones that RN provides by default, to handle a variety of common tasks, such as using more UI elements, accessing cameras, sensors, etc. All of these can be installed in normal RN, but the Expo team does an important job in curating the set of APIs they provide, ensuring that the selected packages work well, and work well on both platform (for the most part). See the full list of Expo APIs here: [https://docs.expo.io/versions/latest/]. This pre-selection is much easier than wading through the 1,000,000+ packages available on npm (see statistics [here](http://www.modulecounts.com)).

Expo makes it easy to run applications both on device and in the simulator. For a device, if Expo is installed on it, you can simply scan the QR code in the Expo console. The Expo console also has buttons to launch the apps in the Android and iOS simulators, if they are installed. Here is how to install them:
- [Android Simulator](https://docs.expo.io/versions/v35.0.0/workflow/android-studio-emulator/). Works on any laptop in which Android studio is installed (Linux, Windows, Mac). Carefully follow the instructions to have the environment properly set up.
- [iOS Simulator](https://docs.expo.io/versions/latest/workflow/ios-simulator/). This works only on Macs.

Note that having the simulators running is processor intensive.

### Creating a new project

The easiest is to follow the instruction on the [expo website](https://expo.io/learn). In a nutshell:

- Donwload and install [NodeJS](https://nodejs.org/en/) (on windows, you can use the LTS release if you run into trouble)
- Install expo with npm `npm install expo-cli --global` (you might need to do this step with super-user right.
- Then issue the following 3 commands
- `expo init project-name`
- `cd project-name`
- `expo start`

### Errors while running Expo

In case you have an error related to regular expressions when starting the expo server (`expo start`), check if it is similar to [this error](https://github.com/expo/expo-cli/issues/1074) (particularly if you are using Windows). If that's the case, it is likely that the version of node that you use is too recent, and there is an incompatibility. Try to use an older version such as the [LTS release](https://nodejs.org/en/).

## Example: Contacts application

In the next few lectures we will build a contact application. By the end it will:
- Show lists of contacts, grouped by their names
- Allow to add new contacts
- Show the details of a given contact
- Connect to an external web service to fetch contact data
- Connect to an external web service to support authentification
- Have an interface that allows efficient navigation in all of this functionality
- Is able to persist its data (including contacts and login state) when it closes.

The end result will be a reasonably featured app, with multiple JS files handling the various functionalities. 


## Scrolling and lists in React

Suppose we have many contacts, to show them, we will need more than one screen. In a webpage, a scroll bar shows up automatically if the content is larger than the screen. In a mobile device, the behaviour is different: given the size of the screen, applications need to limit scrolling if possible, so that most of the UI is accessible at any time. So, in mobile, scrolling must be handled explicitely. 

Often, scrolling is needed when there is a large list of often similar elements to render. We will see several way to define components that handle scrolling, some of them made to explicitly handle lists. The options are:

-  [ScrollView](https://docs.expo.io/versions/latest/react-native/scrollview/), is the simplest, one; we have briefly seen it already. 
- ListView, which is deprecated and should not be used
- [FlatList](https://docs.expo.io/versions/latest/react-native/flatlist/)
- [SectionList](https://docs.expo.io/versions/latest/react-native/sectionlist/)

## ScrollView

This is the most basic scrolling view, which enables you to display more elements than the screen allows. If the elements contained are larger than the space allocated, then the ScrollView allows you to scroll to see the hidden elements. By default in RN, these elements would simply be invisible. An important note here is that to do so, the ScrollView needs to render all of its children before rendering itself. This may not be what you want.

### Examples with Contact app

We start with a file to generate a list of random contacts. We can generate a large list of them and display them in an app. We then need scrolling to display all of them.

Objects rendered in lists in React need to be rendered with a `key` property, which allows to uniquely identify each object. Not doing that results in a warning, because this can make React's diff algorithm inefficient. For instance, instead of inserting an object at the beginning of the list, it may instead modify all the objects in the list, resulting in poor performance.

If the list of contacts is large, it takes some time to render the UI. In fact, performance will degrade linearly with the length of the list. This is because ScrollView renders **all** the elements. That's a lot of elements: there are 4 times as many UI elements as there are contacts. 

This happens even if some of the elements will never be displayed on the screen (e.g., if the user never actually scrolls). They still have to be rendered, which wastes a lot of work

## FlatList

FlatList uses a virtualized list to increase performance. In essence, FlatList only renders what's on the screen. It will not render the elements that won't be seen. 

It also has additional features, such as header, footers, horizontal mode, columns ...

The FlatList takes data as a prop, and a RenderItem function. That way, it will only execute the RenderItem function when needed, for the elements it needs to display. 
The Rows can be recycled (similar to Android's RecyclerView): instead of re-creating objects, a view that is no longer visible can be reused to show a new object. Invisible views may be unmounted. So components with state can be problematic here. Prefer Stateful Functional Components (SFCs) here. 

A ScrollView that renders all the elements:

```javascript
<ScrollView>
{contacts.map(contact => <Contact {...contact}/>))}
</ScrollView>
```

becomes

```javascript
<FlatList 
    data={contacts}
    renderItem = {object => <Contact {...object.item}>} 
/>

// or with can use destructuring:
<FlatList 
    data={contacts}
    renderItem = {({item}) => <Contact {...item}>} 
/>
```

The item that renderItem takes has more properties than the item: there is an index and a separator that it can take. See the API: [renderItem](https://docs.expo.io/versions/latest/react-native/flatlist/#renderitem). 

Notice that now the FlatList is much faster! It's only rendering roughly ten items at once (all that are visible, plus maybe a few more that are just outside the window to make scrollign smoother). It renders the other items only as the user gets to them. An item that is not displayed will never be rendered. Essentially, flatList is "lazy". That's another concept that is found in some functional programming languages, such as Haskell, that has [lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation), in contrast with [eager evaluation](https://en.wikipedia.org/wiki/Eager_evaluation).

Regarding keys, FlatList uses by default the key property of the objects that it renders. But this behaviour can be changed, by passing another function in the `keyExtractor` prop.

### Updating the FlatList

As other components, FlatList only updates if its props are changed. Suppose we added a sort function to our app, such as:

```javascript
sort = () => this.setState(prev => ({contacts: prev.contacts.sort(compareNames)}))

//...
<Button title="sort" onPress={this.sort/}>
```

This will not work as expected. The problem is that array.sort **mutates** the array. So, if we only consider object references, the state is the **same state** as before. From FlatList's point of view, the prop did not change, as the reference did not change. This can be a hard to track bug!

Thus, we would need to create a new array, for instance like this, with the spread operator:

```javascript
sort = () => {
    newArray = [...prev.contacts]
    this.setState(prev => ({contacts: newArray.sort(compareNames)}))
}
```

## SectionList

This is just like a FlatList, but with sections. See the [docs](https://docs.expo.io/versions/latest/react-native/sectionlist/)

The data for a section looks like this
```javascript
const data = [
    {title: "section title", data: [obj1, obj2, obj3]},
    {title: "section 2", data: [obj4, obj5]},
    {title: "section 3", data: [obj6, obj7, obj8]}
    ]
```

Each section can provide a different renderer (`renderItem`), if that is needed. Each section has header, that is rendered as well, with a `renderSectionHeader` prop, another function. For instance:

```javascript
<SectionList
    renderItem={this.renderItem}
    renderSectionHeader={this.renderSectionHeader}
    sections={[{
        title: 'A',
        data: this.state.contacts
        }]}
/>
```

As with a FlatList, each `data` is still a list. It just works like the FlatList, and also does lazy loading to render quickly, even for large lists.



