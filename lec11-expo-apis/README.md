# Expo APIs

As part of its platform, Expo features a lot of APIs, a list of which can be seen [in the Expo documentation](https://docs.expo.io/versions/latest/). In particular, we will focus on the [Expo SDK](https://docs.expo.io/versions/v35.0.0/sdk/overview/), which contains libraries to access useful functionality on a mobile device, such as Sensors, Location, Battery, Camera, Maps, and many others.

These functionalities were either developed from scratch by the Expo team, or are high-quality open source libraries carefully selected, tested, and maintained by the Expo team. In both cases, one of the goals is to unify the functionalities of the different operating systems as much as possible. In case this is not possible, the differences are clearly documented.

To use them, the most important thing is to simply read the documentation. However, there are a few general things to consider.

## Async code

Many of these APIs are provided by **async** functions. This is because they might need an imprevisible amount of time to return (e.g. taking or choosing a picture, or even accessing the internet). You may want to look over the material of the previous class on Async functions and Promises to better understand the differences between synchronous and asynchronous code.

## Permissions

Some of the operations in these APIs access sensitive data, such as pictures, contact, or the location. Applications need to ask the user for permission to access these. The user has every right to deny said permissions. Once a permission is denied, it is pretty hard to get it back (users have to manually enable them back). This means that it is important to explain clearly (and convincingly) why the app needs specific permissions.

Asking for permissions is an async operation (as it requires user interaction). The documentation for the Permissions API is available at:
[https://docs.expo.io/versions/latest/sdk/permissions/]

In short, the following permissions can be asked for:
- `Permissions.NOTIFICATIONS`: The permission type for user-facing notifications and remote push notifications.
- `Permissions.USER_FACING_NOTIFICATIONS`: The permission type for user-facing notifications. This does not register your app to receive remote push notifications.
- `Permissions.LOCATION`: The permission type for location access.
- `Permissions.CAMERA`: The permission type for photo and video taking.
- `Permissions.AUDIO_RECORDING`: The permission type for audio recording.
- `Permissions.CONTACTS`: The permission type for reading contacts.
- `Permissions.CAMERA_ROLL`: The permission type for reading or writing to the camera roll.
- `Permissions.CALENDAR`: The permission type for reading or writing to the calendar.
- `Permissions.REMINDERS`: The permission type for reading or writing reminders. 
- `Permissions.SYSTEM_BRIGHTNESS`: The permissions type for changing brighness of the screen

Note that **there are some subtle differences for some permissions on iOS and Android**. Read the documentation carefully!

## Degrade Gracefully

For many of these APIs, acquiring some resources may not always succeed: Users may decline permissions. Their hardware may not support all the latest sensors. They may be in a location where the internet is slow, or not available. For all of these reasons, if possible, do not rely fully on a feature to be present, but try to have a "plan B" for when the most advanced features are absent. The application may be less convenient to use, but it should hopefully still be usable.

## Be kind on the battery and the network

Many of the advanced APIs are power-hungry. E.g., getting a precise location activates the GPS, which takes a lot of energy. Do not use these too often! 

Note that the [Battery API](https://docs.expo.io/versions/v35.0.0/sdk/battery/) allows you to check the battery status of the device. This information can be useful to alter the behaviour of the application. Your application should try not to consume too many resources, particularly if the battery level is low.
The battery API can:
- Tell the battery level of a device
- Tell if the device is in normal mode, power saving mode, charging, or full
- Allow you to subscribe to battery events, so that a callback is executed if, e.g., battery is low.

Furthermore, the [NetInfo API](https://docs.expo.io/versions/v35.0.0/react-native/netinfo/) allows you to check out the type of connection (none, wifi, cellular, unknown). Callbacks can also be registered to be informed of changes in the connection type.

With these two informations, it is possible to schedule expensive operations in a more user-friendly manner. For instance, an application that needs to send large amounts of data or perform complex operations may try to schedule these operations for when the device is connected to wifi and charging, to minimally impact the user. 


# Some interesting APIs:
Expo has many APIs in the SDK. Here are a few of the most useful ones.

### Permissions

[Permissions](https://docs.expo.io/versions/v35.0.0/sdk/permissions/): receive permissions from the user. This API is needed as a preliminary for various other APIs to ask for permissions before using them.

### Sensors
[Sensors](https://docs.expo.io/versions/v35.0.0/sdk/sensors/): access device harware. Each of these sensors can be used to receive data via a subscription through a callback. Some of these sensors can receive updates regularly (specifying an interval), while others (e.g. the pedometer) will send updates only when new data comes in, as it may come in irregularly. The accessible sensors are:
- [Barometer](https://docs.expo.io/versions/v35.0.0/sdk/barometer/): For air pressure, and relative elavation (the latter is iOS only).
- [Gyroscope](https://docs.expo.io/versions/v35.0.0/sdk/gyroscope/): for device orientation in space.
- [Accelerometer](https://docs.expo.io/versions/v35.0.0/sdk/accelerometer/): for accelaration (including gravity).
- [Magnetometer](https://docs.expo.io/versions/v35.0.0/sdk/magnetometer/): to measure the magnetic field.
- [Pedometer](https://docs.expo.io/versions/v35.0.0/sdk/pedometer/): count the number of steps taken by the user (based on the previous sensors).
- [DeviceMotion](https://docs.expo.io/versions/v35.0.0/sdk/devicemotion/): integrate several of the previous sensors in an easier to read output. Also provides higher-level information such as device orientation (portrait, landscape, upside down).

[Orientation](https://docs.expo.io/versions/v35.0.0/sdk/screen-orientation/): Used to detect the device orientation and adjust the UI accordingly, such as switching from portrait to landscape mode.

### User Interaction
- [Localization](https://docs.expo.io/versions/v35.0.0/sdk/localization/): translate your UI in various languages. Very useful in multilingual regions! 

- [Haptics](https://docs.expo.io/versions/v35.0.0/sdk/haptics/): Used to provide haptics, such as vibrations as user interaction feedback.
- [GestureHandler](https://docs.expo.io/versions/v35.0.0/sdk/gesture-handler/): Used to define user interaction gestures. 
- [Font](https://docs.expo.io/versions/v35.0.0/sdk/font/): To use specific fonts.
- [Reanimated](https://docs.expo.io/versions/v35.0.0/sdk/reanimated/): Can be used to define some animations for UI elements.
- [Speech](https://docs.expo.io/versions/v35.0.0/sdk/speech/): To enable text to speech.


### Battery
[Battery](https://docs.expo.io/versions/v35.0.0/sdk/battery/): Check battery usage, and receive notifications via callbacks if battery is low. This can be used to adapt the behaviour of the app is battery is low.


### Connectivity

- [Cellular](https://docs.expo.io/versions/v35.0.0/sdk/cellular/): Cellular connection and carrier information. 
- [NetInfo](https://docs.expo.io/versions/v35.0.0/sdk/netinfo/): Information about the internet connection in general.
- [SMS](https://docs.expo.io/versions/v35.0.0/sdk/sms/): API to send text messages.

### Sharing
- [Contacts](https://docs.expo.io/versions/v35.0.0/sdk/contacts/): API to access all the contacts stored on the device.
- [DocumentPicker](https://docs.expo.io/versions/v35.0.0/sdk/document-picker/): Allow to choose a document, for purposes such as sharing, etc.
- [Sharing](https://docs.expo.io/versions/v35.0.0/sdk/sharing/): Provide options to share contents with contacts, via the "share sheet".

[Linking](https://docs.expo.io/versions/v35.0.0/sdk/linking/): Define specific links to your application. This is similar to http links, but you can define a prefix for your application. Your application can show a specific part of its UI depending on the content of the link (e.g., an app store link will show the details of a specific apps). Other applications can use these links to communicate with your application. You can also use links to communicate with other applications. Your application will then cede control to the other application. Commonly defined link types include:
- mailto: for emails (opens mail app)
- tel: for calls (opens phone app)
- sms: for text (opens message app)
- https: or http: for web pages (opens browser
Other apps may expose links, such as [lyft](https://developer.lyft.com/v1/docs/deeplinking).


### Storage 
[FileSystem](https://docs.expo.io/versions/v35.0.0/sdk/filesystem/): Access to the part of the filesystem local to the app, to read/write files.
[SQLite](https://docs.expo.io/versions/v35.0.0/sdk/sqlite/): Use a local database for your app. 

### Maps
[MapView](https://docs.expo.io/versions/v35.0.0/sdk/map-view/): Show a map component, allowing you to specify locations, put pins of the maps, etc.
[Location](https://docs.expo.io/versions/v35.0.0/sdk/location/): Get the device's location, and also allows to convert addresses from/to location with geocoding. Note that geocoding or reverse geocoding are battery-consuming operations.

### Camera
[Camera](https://docs.expo.io/versions/v35.0.0/sdk/camera/): Accesses the device's camera, either through the camera app, or through a view that can be embedded in the app's view. 
[ImageManipulator](https://docs.expo.io/versions/v35.0.0/sdk/imagemanipulator/): Provides (basic) image editing operations. 
[ImagePicker](https://docs.expo.io/versions/v35.0.0/sdk/imagepicker/): Allows the user to pick an image through the camera roll, or to take a new picture.
[Face detection](https://docs.expo.io/versions/v35.0.0/sdk/facedetector/): Uses a computer vision API to run face detection on an image. Can also detect whether a person is smiling or not.

### Playback 
[AV](https://docs.expo.io/versions/latest/sdk/av/): to play audio and video files. There are specific APIs for [Video](https://docs.expo.io/versions/latest/sdk/video/) and [Audio](https://docs.expo.io/versions/latest/sdk/audio/)

### Brightness 
You may need these setting when playing video, for instance.

- [Brightness](https://docs.expo.io/versions/v35.0.0/sdk/brightness/): Increase/decrease screen brightness. Note that increasing brightness negatively affects the battery.
- [KeepAwake](https://docs.expo.io/versions/v35.0.0/sdk/keep-awake/): If enabled, disallow the phone to go to sleep. Very bad for battery!


### Graphics
[Svg](https://docs.expo.io/versions/v35.0.0/sdk/svg/): Define React Native components then render vector images.
[GLView](https://docs.expo.io/versions/v35.0.0/sdk/gl-view/): A low-level API to render 3D views. Higher-level APIs use it:
- [Expo-Three](https://github.com/expo/expo-three) uses [three.js](https://threejs.org)
- [Expo-Processing](https://github.com/expo/expo-processing) uses [Processing](http://processingjs.org)

