# Issues installing Expo

## Windows 
Do you have the following error when starting an Expo project on windows?

<img src="https://user-images.githubusercontent.com/10753152/65690550-25da0380-e024-11e9-8699-8cffb869787e.png">

This is because there is an incompatibility between the latest versions of Node.js and Expo, that leads to a regular expression being found incorrect.

The solution is to:
- go to the directory project that does not start
- go to the following sub-directory `node_modules/metro_config/src/defaults`
- edit the file `blacklist.js` with for instance Notepad
- in the following block of code:
```javascript
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,

  /website\/node_modules\/.*/,

  /heapCapture\/bundle\.js/,

  /.*\/__tests__\/.*/,
];
```
- change the line:
```javascript
  /node_modules[/\\]react[/\\]dist[/\\].*/,
```
- to:
```javascript
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
```

After this, doing `expo start` should succeed.

## macOS

If you encounter permission errors while installing Expo:
`npm install expo-cli --global`

Use sudo:

`sudo npm install expo-cli --global`
