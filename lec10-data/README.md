# Client/server communication and working in the background

Most mobile apps are self-contained. Most mobile apps depends on an external component or data source. To interact with this external component, you do it through an API (Application Programming Interface), a protocol that is pre-defined and that you have to follow.

We have seen many examples of this: 
- React components have APIs: their props. Each prop has acceptable values. Components can communicate via props, often through a shared parent.
- Classes have an API: their methods. The methods have acceptable values for their arguments, and sometimes their is a specific order in which the methods must be called (e.g. open a file, then read some lines, then close the file)
- Similarly, a web service has an API: interaction is done through one or more network requests. A web service can also be used to coordinate activities between two mobile devices or applications, similar to the "shared parent" for React components.

To know how to interact with an API, we need to consult it's documentation. Let's look at a specific web service, that we can use to generate random users:
[http://randomuser.me/documentation]

We can see a few examples of how we can interact with this web service: 
- To get a list of a large number of users, we can visit a specific URL: `https://randomuser.me/api/?results=5000`
- To get users of a specific gender, we visit another: [https://randomuser.me/api/?gender=female]

Notice how these URLs follow a specific format. In particular, we can specify a specific operation (a web service endpoint), and give it parameters. The general format is `http://webserviceurl.com/endpoint?parameter1=value1&parameter2=value2&parameter3=value3`

There are many such APIs that exist, such as the Wikipedia API: [https://www.mediawiki.org/wiki/API:Main_page]

## How do we make network requests?

To communicate with a web service, we need to learn how to communicate with it. Web browsers have a `fetch` API. It consists of a `fetch()` method, that can take a URL, plus optional parameters. Fetch builds and executes an HTTP request with this URL and parameters, and receives an HTTP response. Fetch is polyfilled in React, so that we can also use it. An example using the user API would be:

```javascript
 response = fetch("https://randomuser.me/api/?gender=female")
 ```

We cannot cover everything here, but the following links contain a very complete documentation:
- [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API]
- [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch]
- [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts]

Fetch builds an HTTP Request object:
- [https://developer.mozilla.org/en-US/docs/Web/API/Request]

And it **eventually** receive an HTTP Response:
- [https://developer.mozilla.org/en-US/docs/Web/API/Response]

## Long operations
Note the word eventually. There is a lot of work behind the scene:
- Building and executing an HTTP Request
- Connecting to a server and sending it
- The request goes from client to server over the network
- The server receives the request, and decodes it
- The server needs to execute some code to get the data needed to reply
- The response must then be built, and sent back to the client
- The response travels to the client over the network
- The client decodes the request

Needless to say, this can take a lot of time. Many other operations can take a lot of time, such as:
- Data-intensive actions, such as loading a file
- Expensive computations (e.g. applying a filter on a picture)
- Asking the user for input (e.g. asking the user to take or select a picture)
- Getting data from sensors on IOT devices

For all of these actions (and more), it would be unwise suspend execution and `just wait` for the results. We have seen what happens when we render a very large list of items: the UI is blocked. In these cases, we often want that the costly activity happens "in the background", so that we can do something else while we wait. The code in the background should execute **asynchronously**.

In JavaScript, the solution is not to return the result, but to **promise** to return the result in the future.

## What is a promise?

We have seen a way to have code executing in the background already: callbacks. We can send functions to the UI, through the React native UI bridge. These functions will be executed when the user interact with the UI. 

The only issue with this paradigm is that it does not scale very well when we need to do sequences of actions in this way. An additional complexity is when we need to specify callbacks when an action fails (for instance, we want to connect to a server, but we don't have an internet connection). In these cases, we end up with the "callback pyramid of doom":

```javascript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

Promises solve these issues by allowing the user to write asynchronous non-blocking code, and also permit chaining callbacks and error handlers.

In this paradigm, a function that execute asynchronous code does not block execution before returning a result. Instead, it returns "a kind of result" **immediately**. What it returns is a `Promise` object: a "promise" that the result will arrive at some point. 

We will be notified that the code executed with a callback, similarly as before. We specify a callbacks with the `then` and `catch` methods. 

- Promise.then(callback): executes the callback passed in as its argument after the previous promise block returns
- Promise.catch(callback): executes the callback if the previous promise block has an error

Let's see some examples

```javascript
// this is asynchronous code that "does nothing"
// it just blocks execution for a time
const wait = s => new Promise(resolve => setTimeout(resolve, s * 1000));

wait(4).then(() => console.log("done waiting 4 sec!"));
wait(2).then(() => console.log("done waiting 2 sec!"));

```

## Promise chaining
Promises can be **chained**: `then()` returns a new Promise object. So, we can do:

```javascript

const wait = s => new Promise(resolve => setTimeout(resolve, s * 1000));

wait(3)
    .then(() => console.log("waited 3 sec!"))
    .then(() => wait(2))
    .then(() => console.log("waited 2 sec!"))
    .then(() => wait(1))
    .then(() => console.log("waited 1 sec!"))
```

We can also get notified when a problem occured. For instance, suppose that a function crashes:

```javascript

const wait = s => new Promise(resolve => setTimeout(resolve, s * 1000));

const crash = () => {
    throw new Error("crash!")
}

const withError = () => {
    wait(1)
        .then(crash)
        .then(() => console.log("waited 1 sec!"))
        .catch(() => console.log("ooops!!"))
        .then(() => console.log("did we recover?"))
}
```

The catch() callback will be executed.


## Alternative to Promises: Async/await

Even if Promises are nicer than the "callback pyramid of doom", the code is still somewhat verbose. In ES 2017, an alternative was introduced: the `async` and `await` keyworkds. This allows us to write async code “as if” it were synchronous. It is still non-blocking. 

A function can be marked as `async`, and it will automatically be asynchronous and return a Promise. To do so, just use the `async` keyword:

```javascript
const asyncArrow = async () => { ... }
async function asyncFunc() { ...}
```

Within an async function, you can `await` the value of another async function or Promise, by using the `await` keyword.

```javascript
const asyncFunc = async () => {
    const x = somePromise()
    const y = somethingElse
    return await x + y
}
```


Note that async functions and the await keyword are still non-blocking. Async/await looks much more synchronous, but it is asynchronous from then on.

What happens if an error occurs? When using async/await, we should use a try/catch block, which works similarly as it would in Java:

```javascript
const awaitError = async () => {
    try {
        const w1 = await waitReturn(1)
        const oops = await crash()
        console.log(w1)
      } catch(error) {
        console.log("something happened: " + error.message)
      }
}   
```



## In the Contacts app
We can use the [http://randomuser.me] web service to load a list of users. Doing it with the tools we have is relatively easy. What we need to think about, is **where** we want to put this functionality. Similarly than with navigation, we do not want to integrate a web service connection in any arbitrary component, as it would make the component much harder to reuse in the future.

The Root component of the application is probably the best place for now. But where? Since this operation can take a long time, we don't want to do it while rendering. The natural point for this is `componentDidMount`, where we can fetch data after the first render. So we have something to show at the beginning.

## Transforming data

The implementation with Promises and Async/await is relatively straightforward. We:
- send a request to the web service
- await a response
- convert it to a JavaScript object
- set our state based on this object


However, we are assuming that the data that comes back is the data from the application. But the objects returned by the web service have a different format. Our application expects object of format: `{name: string, phone: string}`. On the other hand, the web service returns objects of this format: `{name: {first: , last:, title: }, phone: string, many, other, keys}`.

We need to transform the data, but where? We have two options:
- Right before the render, in the Contacts component. But we would do it over and over after each render.
- What if we did it right after the data came back? It would be more efficient, as it would be done only once.

Moreover, if we it then, we also get an **abstraction barrier**: we isolate the transformation outside the component, so the component only cares about the data that comes. the API could change, but we would only need to change the "abstraction barrier", not the rest of the application. 

In short, the application doesn't "care" about the specific API that we use, or even it's address. So the App should not know about it.
We can create a new file for that, where we can hide the design decision of which API we are using. We will move our data fetching function there. Note that we may want to refactor it. In that context, setState does not make sense anymore, are we are not in a Rect Component anymore. The function should just return the data. The Component calling it would be in charge of setting the state. The result should look something like this:

```javascript
export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    const {results} = await response.json()
    return results //still not transformed
}
```
So `fetchUsers` is just fetching the data, getting the response, the json, and getting the piece we care about.


And in the React component:

```javascript
setUsers = async () => {
    const results = await fetchUsers() 
    this.setState({contacts: results})
}   

componentDidMount() {
    this.getUsers()
}
```

Now, nothing in the App knows about the API, expect the file where the API is accessed. If we change the API, we just need to this file.

To transform the data, we need to convert the contacts from their initial format to our format. We can use `map` for that: 


```javascript
const processContact = contact => ({name: `${contact.name.first} ${contact.name.first}`, phone: contact.phone})

export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    const {results} = await response.json()
    return results.map(processContact)
}
```

After these changes, two files of the contact app, [contacts.js](./contacts.js) and [App.js](./App.js) have changed to implement fetching the contacts from a remote server.

## Pagination

In case you want to load a large amount of data (say, hundreds or thousands of users), you may not want to load all the data at once. An alternative is to use pagination, where you can load pages of data individually. This can be used to populate a list with the initial page of data, and defer loading of the other pages when it is truly needed.

The FlatList components supports two props to enable pagination: `onEndReached`, which is called when the end of the list is reached, and is a good spot to load more data. In addition, `onEndReachedThreshold` is used to specify a threshold (in pixels) before reaching the actual end of the list, so that `onEndReached` is called ahead of time, making it less likely that the user has to wait for more data.

An example of using these properties is available here:
https://snack.expo.io/@mkpeak/react-native-flatlist-pagination-to-load-more-data-dynamically---infinite-list

Furthermore, some libraries exist to make the process easier to implement:
- [PaginatableList](https://ttt.studio/blog/paginatablelist-for-react-native/)

# Handling Login

The contacts app is not very secure: we have a login screen, but it directly logs us in, without any authentication. 

How can you know that a request comes from who they say they are? By agreeing on a shared secret, the password.

We can use a very simple authentication server (That has several glaring security issues! This is for illustration purposes only), and interact with it with HTTP requests.

The server can tell us if a user with a given login exists, and then check whether the password is correct. This server will listen to HTTP requests on our development machine, on port 8000. 

It is not a good idea to transmit passwords in URLs, which is what we would do if we used the HTTP GET requests we were using previously. Instead we can use a POST HTTP request.

The implementation of the authetication server is available in the [authServer](./authServer) directory. It can be started by using `npm start` in this directory.

## HTTP GET vs POST
For GET, we can add parameters with the key and value scheme: `?param=foo&other=bar&..."`. We can use the documentation to know what the allowed parameters are

POST is used to submit data to an endpoint.
Unlike a GET request, a POST request has a body.
The data in the body can be posted in JSON format (JavaScript Object Notation), if `content-type: application/json`. In this case both header and body of the request must be JSON strings.
where should we have the login logic? in a Login component.
take the time to locate the file, and recall how it works ...

## "Securing" the app

We need to implement some UI first. We can do that in the LoginSCreen component. In it, we will need login and password text inputs:
```javascript
handleUsernameUpdate = username => this.setState({username})

<TextInput 
    placeholder="username" 
    value={this.state.username}
    onChangeText={this.handleUsernameUpdate} />
```

To log in, we will need to build an HTTP POST request that we need to send to the server:

```javascript

login = async () => {
    const response = await fetch('http://localhost:8000', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
    })
    console.log(response)
}
```

Note that the body should be a json string, not a JS object. So we convert the JS object to a string with `JSON.stringify`.

To know more about the types of attributes in the response, we can simply log it for now. One attribute of interest is the HTTP response status. There are many response codes, divided in several categories: 

- Informational responses (100–199),
- Successful responses (200–299),
- Redirects (300–399),
- Client errors (400–499),
- Server errors (500–599).

Specific response codes of interest:
- 200: all went well
- 403: forbidden (not allowed to access this, permissions insufficient)
- 404: not found (the resource does not exist)
- 500: internal server error (the server has an issue, not your code)

We can have a look at the server code to see how the server uses these codes to respond to client requests.

We now know how to check if the request worked. In practice, we can use the OK boolean property of the Response object to know if the request worked.

```javascript
login = async () => {
    const response = await fetch('http://localhost:8000', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
    })
    
    if (response.ok) {
        this.props.navigation.navigate('Main')
        return
    }
}
```

The final code of the application (and the server) are available below.

## Going farther

We can further improve the App by doing the following:
- Display informative messages if the login operation was not succesful. Silent failures lead to a very bad user experience.
- We can improve the text inputs as well, by passing them specific props. The username should not default to uppercase (`autoCapitalize`). The password should not be visible ('`secureTextEntry`). We can find them in the [TextInput API](https://facebook.github.io/react-native/docs/textinput.html).
- We can move the authentication code out of the component, in our "API module". We can also refactor it to use exceptions.
- Server-wise, we could implement a basic security measure: an exponential delay in the time it takes to authenticate, depending on the number of previous past guesses.
